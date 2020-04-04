// pages/my/my.js
import { getUserDetail } from "../../api/player.js";
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    
  },
  jumpPage(e) {
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url,
    })
  },
  getuserInfo(){
    const userInfo = this.selectComponent('#userInfo');
    userInfo.getUserData();
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // getUserDetail()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // this.getUserData();
    // this.selectComponent("#userInfo").refreshFlag();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // this.getUserData().then(res => {
    //   wx.stopPullDownRefresh();
    // });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
