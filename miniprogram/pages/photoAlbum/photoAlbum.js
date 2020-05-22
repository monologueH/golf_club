// miniprogram/pages/photoAlbum/photoAlbum.js
import { upload } from '../../api/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [{
      url: '',
    }, {
      loading: false
    }, {
      error: false
    }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   selectFile: this.selectFile.bind(this)
    // })
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
  select(e){
    console.log(e.detail.contents)
  
   let header = {
      'Content-Type': 'multipart/form-data; boundary=XXX'
}
    var formData = '\r\n--XXX' +
      '\r\nContent-Disposition: form-data; name="file"' +
      '\r\n' +
      '\r\n' + e.detail.contents +
      '\r\n--XXX'
   
    upload(formData,header).then(res => {
      console.log(res)

    })
  },
  // selectFile(files) {
  //   console.log('files', files)
  //   // 返回false可以阻止某次文件上传
  //   // upload(files).then(res => {
  //   //   console.log(res)

  //   // })
  // },
  uplaodFile(files) {
    console.log('upload files', files)
    // 文件上传的函数，返回一个promise
  upload().then(res=>{
    console.log(res)

  })
    
  },
  uploadError(e) {
    console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
    console.log('upload success', e.detail)
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
