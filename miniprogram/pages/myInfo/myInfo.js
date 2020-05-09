// miniprogram/pages/editMy/editMy.js
import { getUserDetail } from "../../api/player.js";
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    otherInfo:null
  },
  getUserData() {
    getUserDetail().then(res => {
      this.setData({
        userInfo: res.data,
        otherInfo: res.data.mOther
      })
      app.globalData.userInfo = res.data;
      console.log(res.data)
    })
  },
  openEdit(e){
    const name = e.currentTarget.dataset.name;
    const type = e.currentTarget.dataset.type || 'input';
    wx.navigateTo({
      url: `/pages/editMy/editMy?name=${name}&type=${type}`,
    })
    console.log(name)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getUserData();
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