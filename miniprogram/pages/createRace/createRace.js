// miniprogram/pages/createRace/createRace.js
import { createGame } from '../../api/index.js'
Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    form:{
      gStartDate: new Date().toLocaleDateString().replace(/\//g, "-"),
      gStartTime:'00:00',
      isPrivate:false,
      isOnlyGroup:false,
      // 比赛类型
      gType:0
    },
    dateToday: new Date().toLocaleDateString().replace(/\//g, "-"),
    placeInfo:{},
    groupList:[
      {
        ggName:'小组 1',
        mNoList:[]
      }
    ],
    showSel:false,
    buttons:[
      {
        type: 'warn',
        text: '删除',
        extClass:'slideDel'
      }
    ]
  },
  bindbuttontap(e){
    console.log(e)
    const {index:btnIndex} = e.detail
    const {index:groupIndex} = e.currentTarget.dataset
    console.log(btnIndex,groupIndex)
    if(btnIndex === 0){
      if(this.data.groupList.length <=1) return;
      this.data.groupList.splice(groupIndex,1);
      this.setData({
        groupList:this.data.groupList
      })
    }
  },
  createRace(){
    console.log(this.data.form)
    let gJoinCount = 0;
    let gIsPrivate = 0;
    if (this.data.form.isPrivate) gIsPrivate = 1
    if (this.data.form.isOnlyGroup) gIsPrivate = 2
    const gGameGroupReqList = this.data.groupList.map(item=>{
      const group = { ggName:item.ggName }
      group.mNoList = item.mNoList.map(member=>{
        gJoinCount += 1;
        return member.mNo
      })
      return group;
    })
    const result = {
      ...this.data.form,
      gGameGroupReqList,
      gJoinCount,
      gIsPrivate,
      gPlaceNo: this.data.placeInfo.pNo,
      gPlaceInfoJSON:this.data.placeInfo
    }
    result.gStartDate = `${result.gStartDate} ${result.gStartTime}:00`
    const varifyList = [
      {
        name: 'gName',
        title: "请输入比赛名称!",
      },
      {
        name:'gPlaceNo',
        title: "请选择球场信息!",
      },
      {
        name:'gJoinCount',
        title:"请至少选择一个参赛人员!"
      }
    ]
    console.log(result)
    for(let i = 0;i < varifyList.length;i++){
      if (!result[varifyList[i].name]) {
        wx.showToast({
          title: varifyList[i].title,
          icon: "none"
        });
        return;
      }
    }
    createGame(result).then(res=>{
      wx.redirectTo({
        url: '/pages/raceList/raceList',
      })
    })
  },
  selectPlace(){
    wx.navigateTo({
      url: '/pages/placeList/placeList',
    })
  },
  addPlayer(e){
    const {index:groupIndex} = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/playerList/playerList?groupIndex=${groupIndex}`,
    })
  },
  addGroup(){
    const groupList = this.data.groupList;
    groupList.push({
      ggName:`小组 ${groupList.length + 1}`,
      mNoList: []
    })
    this.setData({
      groupList
    })
  },
  bindFormChange(e){
    console.log(e.detail.value)
    const {name} = e.currentTarget.dataset
    this.setData({
      [`form.${name}`]:e.detail.value
    })
  },
  bindTimeChange(e){
    console.log(e.detail.value)
    this.setData({
      ['form.gStartTime']: e.detail.value
    })
  },
  selsectdate: function () {
    this.setData({
      showSel: true //控制弹窗隐藏显示
    });
  },
  cancelSel() {
    this.setData({
      showSel: false //控制弹窗隐藏显示
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(new Date().toLocaleDateString().replace(/\//g,"-"))
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