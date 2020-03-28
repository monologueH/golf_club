// miniprogram/pages/playerList/playerList.js
import { getPlayerList } from "../../api/player.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    playerList:[],
    groupIndex:0
  },
  saveChanges(){
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];  //上一个页面
    if(prevPage){
      const selectedList = this.data.playerList.filter(item => item.isSelected && !item.inOtherGroup);
      prevPage.setData({
        [`groupList[${this.data.groupIndex}].mNoList`]: selectedList
      })
      wx.navigateBack({
        delta:1
      })
    }
  },
  selectPlayer(e){
    const {index} = e.currentTarget.dataset

    this.setData({
      [`playerList[${index}].isSelected`]:!this.data.playerList[index].isSelected
    })
  },
  isPlayerSelected(val){
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];  //上一个页面
    const groupList = prevPage.data.groupList;
    const result = {
      isSelected: false,
      inOtherGroup: false
    }
    groupList.forEach((group,gIndex)=>{
      group.mNoList.forEach((member,mIndex)=>{
        if(member.mNo === val.mNo){
          result.isSelected = true;
          if (gIndex !== this.data.groupIndex){
            result.inOtherGroup = true;
          }
        }
      })
    })
    Object.assign(val,result);
    return result;
  },
  getPlayerList(){
    getPlayerList().then(res=>{
      const playerList = res.data.map(item=>{
        this.isPlayerSelected(item);
        return item;
      }).filter(item=>!item.inOtherGroup)
      this.setData({
        playerList
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const groupIndex = options.groupIndex;
    if(groupIndex){
      this.setData({
        groupIndex:parseInt(options.groupIndex)
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getPlayerList()
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