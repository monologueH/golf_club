// miniprogram/pages/playerList/playerList.js
import { getPlaceList } from "../../api/place.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeList:[],
    selectedIndex: 0,
    placeDetail:[],
    existGroundList:[],
    currentHoleNumIndex:0,
    groundList:['A','B']

  },
  selectHalf(e){
    const {item,index} = e.currentTarget.dataset;
    let tmpList = [];
    if(index === 0){
      tmpList = ['A', 'B']
    }else{
      this.data.placeDetail.forEach(item=>{
        tmpList.push(item.name)
      })
    }
    this.setData({
      groundList: tmpList,
      currentHoleNumIndex:index
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
      // console.log(placeList)
      this.setData({
        placeList,
        placeDetail:res.data[0].pOtherDetail.placeList
      })
      this.setHoleNum(res.data[0].pOtherDetail.placeList)
    })
  },
  setHoleNum(placeDetail){
    let currentList = [];
    if(placeDetail.length >=4){
      currentList = [
        {
          name:'18洞',
          groundList:['A','B']
        },
        {
          name: '36洞',
          groundList: ['C', 'D']
        }
      ]
    }else{
      currentList = [
        {
          name: '18洞',
          groundList: ['A', 'B']
        }
      ]
    }
    this.setData({
      existGroundList:currentList
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