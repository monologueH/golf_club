// miniprogram/pages/sendMsg/sendMsg.js
import { getMsgList, sendMsg } from "../../api/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoList:[],
     value:'',
     mode: 'view'
  },
  async getMsg() {
    const { data } = await getMsgList()
    console.log(data)
    this.setData({
      infoList: data
    })
  },
  inputChange(e){
    const value = e.detail.value;
    console.log(value)
    this.setData({
       value
    })
  },
  sendMsg(){
    console.log(this.data.value)
    if(!this.data.value) return
    const params = {
      msgContent: this.data.value,
      msgType: 0,
      mNoList: null
    }
    sendMsg(params).then(res=>{
      this.getMsg();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const mode = options.mode || 'view';
    this.setData({
      mode
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
    this.getMsg();
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