// miniprogram/pages/editMy/editMy.js
import { editUserDetail } from '../../api/player.js'
const app = getApp();
const clothSizeList = ['XS', 'S', 'L', 'XL', 'XXL', 'XXXL'];
const shoeSizeList = ['34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47',];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:null,
    value:null,
    isPublic: false,
    type:'input',
    pickerList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name:options.name,
      type:options.type || "input"
    })
    console.log(options.type)
    if (options.type === 'clothSize'){
      
      this.setData({
        pickerList: clothSizeList
      })
    } else if (options.type === 'shoeSize') {
      this.setData({
        pickerList: shoeSizeList
      })
    }
    const info = app.globalData.userInfo.mOther[options.name];
    if (info){
      this.setData({
        value: info.info,
        isPublic: info.isPublic,
      })
    }
  },
  bindFormChange(e){
    console.log(e)
    const name = e.currentTarget.dataset.name;
    console.log(name)
    let value = e.detail.value;
    if(this.data.type === 'clothSize'){
      value = clothSizeList[parseInt(e.detail.value)];
    } else if (this.data.type === 'shoeSize'){
      value = shoeSizeList[parseInt(e.detail.value)];
    }
    this.setData({
      [name]: value
    })
  },
  onCancel(){
    wx.navigateBack({
      delta: 1
    })
  },
  onConfirm(){
    if(!this.data.value) return
    const params = {
      mOther: {
        [this.data.name]:{
          info: this.data.value,
          isPublic: this.data.isPublic
        }
      }
    }
    this.editUserInfo(params);
  },
  editUserInfo(params){
    editUserDetail(params).then(res=>{
      this.onCancel();
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