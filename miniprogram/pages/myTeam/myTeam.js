// miniprogram/pages/myTeam/myTeam.js
import { getTeamInfo } from "../../api/player.js";
import { getTeamUser } from "../../api/player.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamInfo:{
      tavatarUrl:'',
      ttitle:'',
      tname:'',
      ttel:''

    },
    memberList:[]
  },
  getTeamInfo(){
    const params={'tNo':'PQBhXlrYTicQAzOO2jSCGOCEFLsjhKAV'}
    getTeamInfo(params).then(res=>{
      this.setData({
        [`teamInfo.tavatarUrl`]:res.data.tavatarUrl,
        [`teamInfo.tname`]:res.data.tname,
        [`teamInfo.ttitle`]:res.data.ttitle,
        [`teamInfo.ttel`]:res.data.ttel,
      })
  })

},
getTeamUser(){
  const params={'tNo':'PQBhXlrYTicQAzOO2jSCGOCEFLsjhKAV'}
  getTeamUser(params).then(res=>{
    this.setData({
      memberList:res.data
    })
})
},
toDetails(e){
  var mNo=e.currentTarget.dataset.item.mno
  wx.navigateTo({
    url: `/pages/memberDetails/memberDetails?mNo=${mNo}`,
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