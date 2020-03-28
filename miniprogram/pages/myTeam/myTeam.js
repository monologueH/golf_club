// miniprogram/pages/myTeam/myTeam.js
import { getTeamInfo } from "../../api/player.js";
import { getTeamUser } from "../../api/player.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamList:[],
    teamUserList:[]
  },
  getTeamInfo(){
    const params={'tNo':'PQBhXlrYTicQAzOO2jSCGOCEFLsjhKAV'}
    getTeamInfo(params).then(res=>{
      this.setData({
        teamList:res.data
      })
  })

},
getTeamUser(){
  const params={'tNo':'PQBhXlrYTicQAzOO2jSCGOCEFLsjhKAV'}
  getTeamUser(params).then(res=>{
    this.setData({
      teamList:res.data
    })
})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getTeamInfo()
    this.getTeamUser()

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