// miniprogram/pages/playerList/playerList.js
import { getPlaceList } from "../../api/place.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeList:[],
    selectedIndex: 0,
ist:[],
    placeDetail:[],
    groundList:[]

  },
  selectHalf(e){
    const {item} = e.currentTarget.dataset;
    const currentIndex = this.data.groundList.indexOf(item.name);
    let groundList;
    if (currentIndex > -1){
      this.data.groundList.splice(currentIndex,1);
    }else {
      if(this.data.groundList.length >= 2) {
        wx.showToast({
          icon: 'none',
          title: '只能选择两个场地',
        })
        return
      }
      this.data.groundList = [...this.data.groundList, item.name];
    }
    console.log(groundList)
    this.setData({
      groundList: this.data.groundList
    })
  },
  
  saveChanges(){
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    const { selectedIndex,groundList,placeList} = this.data;
    const currentPlace = placeList[selectedIndex];
    console.log(selectedIndex, groundList)
    if(prevPage){
      prevPage.setData({
        placeInfo:{
          pName: currentPlace.pName,
          pNo:currentPlace.pNo,
          groundList
        }
      })
      wx.navigateBack({
        delta:1
      })
    }
  },
  selectPlace(e){
    const {index,item} = e.currentTarget.dataset
    console.log(item)
    this.setData({
      selectedIndex:index,
      placeDetail: item.pOtherDetail.placeList
    })
    console.log(this.data.placeDetail)
  },
  getPlaceList(){
    getPlaceList().then(res=>{
      const placeList = res.data;
      this.setData({
        placeList,
        placeDetail:res.data[0].pOtherDetail.placeList
      })
    })
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
    this.getPlaceList()
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