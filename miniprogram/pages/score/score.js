// miniprogram/pages/score/score.js
import { genScoreList, standard } from './shots.js'
import { getGameDetail, getScoreInfo, markScore, getAllScore } from '../../api/index.js'
import { getPlaceDetail } from '../../api/place.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTabIndex: 0,
    tabList: [
      { name: '计分', value: 'myScore' },
      { name: '所有成绩', value: 'allScore' },
      { name: '游戏规则', value: 'gameRule' },
    ],
    HOLE_MAP:{
      A: '1-9洞',
      B: '10-18洞',
      C: '18-27洞',
      D: '28-36洞',
    },
    showSel: false,
    scoreInfo: [],
    shots: [],
    pushList: [],
    penalty: [],
    placeFeature: [],
    gameDetail: null,
    scoreDetail: null,
    currentHole: null,
    standardList: standard
  },
  showScorePanel(e) {
    const { item } = e.currentTarget.dataset
    console.log(item.num)
    const shots = genScoreList(item.num);
    this.setData({
      showSel: true,
      shots,
      scoreInfo: [item.num ? (item.num - 1) : 0, item.gs ? item.gs - 1 : 0],
      currentHole: item
    })
  },
  bindChange(e) {
    const val = e.detail.value;
    console.log(val)
    const shots = genScoreList(val[0] + 1);
    this.setData({
      scoreInfo: val,
      shots
    });
  },
  navClick(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentTabIndex: index
    })
  },
  markScore(data) {
    const { currentHole, scoreDetail } = this.data;
    const params = {
      ...data,
      fairWayNo: currentHole.id,
      gNo: scoreDetail.gNo,
      ggNo: scoreDetail.ggNo,
      mNo: scoreDetail.mNo,
      sType: 1
    }
    console.log(params)
    markScore(params).then(res => {
      this.getScoreInfo()
    })
  },
  cancelSel() {
    this.setData({
      showSel: false //控制弹窗隐藏显示
    });
  },
  confirmSel() {
    let cityStr;
    console.log(this.data.currentHole)
    // 兼容小程序返回空的bug
    if (this.data.scoreInfo.length === 0) {
      this.setData({
        scoreInfo: [0, 0],
      });
    }
    this.markScore({
      "scoreReq": {
        standardPoleCount: this.data.scoreInfo[0] + 1,
        gs: this.data.scoreInfo[1] + 1
      }
    });
    this.setData({
      showSel: false, //控制弹窗隐藏显示
    });
  },
  getScoreInfo() {
    getScoreInfo({ gNo: this.data.gNo }).then(res => {
      const holeDetail = res.data.scoreVoList.map(item => {
        item.holeList = item.holeList.reduce((t, c, i) => {
          if (i % 2 === 0) {
            t.push([c])
          } else {
            t[t.length - 1].push(c)
          }
          return t
        }, [])
        return item;
      })
      this.setData({
        scoreDetail: res.data,
        holeDetail
      })
    })
  },
  init(gno) {
    getGameDetail({ gNo: this.data.gNo }).then(gameRes => {
      this.setData({
        gameDetail: gameRes.data
      })
    })
    this.getScoreInfo()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const gno = options.gno;
    console.log(gno)
    this.setData({
      gNo: gno
    })
    this.init()
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