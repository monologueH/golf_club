//app.js
import { getAuth } from "./api/index.js";
App({
  onLaunch(options) {
    console.log("app", options);
    const channel = options.query.scene || options.query.channel;
    if (channel) {
      this.globalData.channel = channel;
    }
    // console.log('globalChannel',this.globalData.channel)
    this.overShare();
    // 登录
    wx.login({
      success: loginData => {
        console.log(loginData)
        // 发送 loginData.code 到后台换取 openId, sessionKey, unionId
        // 获取用户信息
        wx.getSetting({
          success: settingRes => {
            if (settingRes.authSetting["scope.userInfo"]) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  console.log(res)
                  this.getAuth(loginData, res);
                },
                fail: res => {
                  const token = wx.getStorageSync("token");
                  console.log(res)
                  if (!token) {
                    this.getAuth(loginData);
                  }
                }
              });
            }else{
              this.getAuth(loginData)
            }
          },
          fail(){
            this.getAuth(loginData)
          }
        });
      }
    });
  },
  //重写分享方法，页面的data中isOverShare=true的不会重写!important
  overShare: function () {
    //监听路由切换
    //间接实现全局设置分享内容
    wx.onAppRoute(function (res) {
      //获取加载的页面
      let pages = getCurrentPages(),
        //获取当前页面的对象
        view = pages[pages.length - 1],
        data;
      if (view) {
        data = view.data;
        // console.log("是否重写分享方法", !data.isOverShare);
        if (!data.isOverShare) {
          data.isOverShare = true;
          view.onShareAppMessage = function () {
            const channel = wx.getStorageSync("channel");
            console.log("channel", channel);
            //你的分享配置
            return {
              title: "有一家好店分享给你~",
              path: `/pages/index/index?channel=${channel}`,
              imageUrl: "/assets/images/logo.png"
            };
          };
        }
      }
    });
  },
  onShow(options) {
    // console.log(options);
  },
  getAuth(data, res) {
    let params = {
      code: data.code
    };
    if (this.globalData.channel) {
      params.channel = this.globalData.channel;
    }
    console.log("getAuthParams", params);
    if (res && res.userInfo) {
      params = Object.assign(params, {
        nickName: res.userInfo.nickName,
        avatarUrl: res.userInfo.avatarUrl,
        gender: res.userInfo.gender
      });
    }
    return getAuth(params).then(response => {
      wx.setStorageSync("token", response.data.token);
      wx.setStorageSync("channel", response.data.channel);
      // wx.setStorageSync("loginFlag", response.data.loginFlag);
      this.globalData.loginFlag = response.data.loginFlag;
      return response;
    });
  },
  noImgGetAuth(callback) {
    wx.login({
      success: loginData => {
        this.getAuth(loginData).then(res => {
          callback && callback();
        });
      }
    });
  },
  globalData: {
    userInfo: null,
    ajaxCount: 0,
    channel: "",
    isShowAuthPop: true,
    loginFlag: 0,
    // 上传不同小程序需要变更appcode
    // wxe6ae9a5bb806a9f9 : 1
    // wx087b5b2d1591a54e : 2
    appCode: 1
  }
});
