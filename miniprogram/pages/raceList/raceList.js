// miniprogram/pages/raceList/raceList.js
import { getGameList } from '../../api/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    labelColor: ['#4796eb', '#e15241','#67ac5c']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  jump2Score(e){
    const {item} = e.currentTarget.dataset
    console.log(item)
    wx.navigateTo({
      url: `/pages/score/score?gno=${item.gNo}`,
    })
  },
  getData(){
    getGameList().then(res=>{
      // const raceList = res.data.forEach(item=>{
      //   item.gplaceInfo = item.gPlaceInfoJSON
      // })
      this.setData({
        raceList:res.data
      })
      console.log(this.data.raceList[0])
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
    this.getData()
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