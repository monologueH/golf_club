// miniprogram/pages/photoAlbum/photoAlbum.js
import {
  upload,
  albumImgs
} from '../../api/index.js'
import config from "../../utils/config";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    pageParams: {
      pageNum: 1,
      pageSize: 20
    },
    imgList: [],
    listFinished:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   selectFile: this.selectFile.bind(this)
    // })
    this.getImgList();
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // chooseImage: function (e) {
  //   var that = this;
  //   wx.chooseImage({
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success: function (res) {
  //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //       that.setData({
  //         files: that.data.files.concat(res.contents)
  //       });
  //       console.log(res)
  //     }
  //   })
  // },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  onScrollToBottom(e){
    this.setData({
      ['pageParams.pageSize']:this.data.pageParams.pageSize + 20
    })
    console.log(this.data.listFinished)
    if(!this.data.listFinished){
      this.getImgList()
    }
  },
  selectFile(e) {
    console.log(e.detail.contents)
  },
  async getImgList() {
    const {
      data
    } = await albumImgs(this.data.pageParams)
    if(data.records.length === this.data.imgList.length){
      this.setData({
        listFinished:true
      })
      return
    }
    this.setData({
      imgList: data.records,
      files:data.records.map(item=>item.pcontent)
    })
  },
  // selectFile(files) {
  //   console.log('files', files)
  //   // 返回false可以阻止某次文件上传
  //   // upload(files).then(res => {
  //   //   console.log(res)

  //   // })
  // },
  chooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        this.uplaodFile(res)
      }
    })
  },
  uplaodFile(e) {
    // 文件上传的函数，返回一个promise
    const token = wx.getStorageSync("token");
    console.log('upload e', e.tempFilePaths[0])
    wx.uploadFile({
      url: `${config.BASE_URL}/golf/g-user-media/saveGUserMedia`,
      filePath: e.tempFilePaths[0],
      name: "file",
      formData: {},
      header: {
        Authorization: "Bearer " + token
      },
      success:(res)=> {
        const {
          data
        } = res;
        const {
          data: {
            pcontent
          }
        } = JSON.parse(data);
        this.getImgList()
        //do something
      },
      fail(err) {
        console.log(err)
      }
    });
  },
  uploadError(e) {
    console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
    console.log('upload success', e.detail)
    this.setData({
      files: []
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})