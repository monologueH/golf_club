// miniprogram/pages/editMy/editMy.js
import { editUserDetail } from '../../api/player.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:null,
    value:null,
    isPublic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name:options.name
    })
    const info = app.globalData.userInfo.mOther[options.name];
    if (info){
      this.setData({
        value: info.info,
        isPublic: info.isPublic,
      })
    }
  },
  bindFormChange(e){
    const name = e.currentTarget.dataset.name;
    this.setData({
      [name]: e.detail.value
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