//index.js
//获取应用实例
import { getAuth, getMsgList } from "../../api/index.js";
const app = getApp();
let timer = null;
Page({
  data: {
    infoList:[],
    textLeftAnimation:{}
  },
  onLoad: function () {
    app.noImgGetAuth(()=>{
      this.getMsg();
    })
  },
  onShow(){
    // this.getMsg();
  },
  async getMsg(){
    const {data} = await getMsgList()
    console.log(data)
    if(!data)return;
    this.setData({
      infoList: data.slice((data.length - 2) > 0 ? (data.length - 2):0,data.length)
    })
    this.initInfoAnimation();
  },
  initInfoAnimation(){
    const query = wx.createSelectorQuery();
    query.select('.msgWrap').boundingClientRect((rect)=> {
      const speed = 10;
      const screenWidth = wx.getSystemInfoSync().windowWidth;
      let duration = (rect.width + screenWidth) * speed
      let animationLeft = wx.createAnimation({
        timingFunction: 'linear',
        delay: 0
      }) 
      this.setData({
        wrapWidth: rect.width
      })
      this.textMoveAnimation(animationLeft, duration);
      if(timer){
        clearInterval(timer)
      }
      console.log(duration)
      timer = setInterval(() => {
        this.textMoveAnimation(animationLeft, duration);
      }, duration)
    }).exec();
  },
  // 文字移动动画
  textMoveAnimation(animationLeft,duration){
    animationLeft.left("750rpx").step({
      duration: 0
    })
    this.setData({
      textLeftAnimation: animationLeft.export()
    });
    animationLeft.left(-this.data.wrapWidth + 'px').step({
      duration
    })
    this.setData({
      textLeftAnimation: animationLeft.export()
    })
  },
  jumpPage(e){
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url,
    })
  }
})
