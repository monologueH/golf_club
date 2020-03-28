//index.js
//获取应用实例
import { getAuth } from "../../api/index.js";
const app = getApp();

Page({
  data: {
    
  },
  onLoad: function () {
    // app.getAuth()
  },
  jumpPage(e){
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url,
    })
  }
})
