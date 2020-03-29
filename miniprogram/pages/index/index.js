//index.js
//获取应用实例
import { getAuth, getMsgList } from "../../api/index.js";
const app = getApp();

Page({
  data: {
    infoList:[],
    textLeftAnimation:{}
  },
  onLoad: function () {
    // app.getAuth()
    this.getMsg();
  },
  async getMsg(){
    const {data} = await getMsgList()
    console.log(data)
    this.setData({
      infoList: data
    })
    this.initInfoAnimation();
  },
  initInfoAnimation(){
    const query = wx.createSelectorQuery();
    query.select('.msgWrap').boundingClientRect((rect)=> {
      console.log(rect.width)
      const speed = 10;
      const duration = rect.width * speed
      let animationLeft = wx.createAnimation({
        duration: rect.width * speed,
        timingFunction: 'linear',
        delay: 0
      }) 
      animationLeft.left(-rect.width).step();
      // that.setData({
      //   height: rect.width + 'px'
      // })
      this.setData({
        textLeftAnimation: animationLeft.export(),
        wrapWidth: rect.width
      })
      setInterval(() => { 
        animationLeft.left("750rpx").step({
          duration:0
        })
        this.setData({
          textLeftAnimation: animationLeft.export()
        });
        animationLeft.left(-this.data.wrapWidth).step({
          duration:this.data.wrapWidth * speed
        })
        this.setData({
          textLeftAnimation: animationLeft.export()
        })
      }, duration)
    }).exec();
    
  },
  jumpPage(e){
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url,
    })
  }
})
