// const BASE_URL = "https://www.easy-mock.com/mock/5d429ba209476d56c7c9cf71";
import config from "./config.js";
const { BASE_URL } = config;

function request(reqParam) {
  const app = getApp();
  const TOKEN = wx.getStorageSync("token") || "";
  const APP_CODE = app.globalData.appCode || "";
  let HEADER = {};
  // 身份验证token
  if (TOKEN) {
    HEADER.Authorization = "Bearer " + TOKEN;
  }
  // 区分不同小程序的appCode
  if (APP_CODE) {
    HEADER.appCode = APP_CODE;
  }
  // 接口携带的header
  if (reqParam.header) {
    HEADER = { ...HEADER, ...reqParam.header };
  }
  if (app && app.globalData && app.globalData.ajaxCount === 0) {
    wx.showLoading({
      title: "加载中",
      mask: true
    });
  }
  app && app.globalData.ajaxCount++;
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + reqParam.url,
      method: reqParam.method ? reqParam.method : "GET",
      header: HEADER,
      data: reqParam.data,
      success(res) {
        const { data } = res;
        if (data.code === 0) {
          resolve(data);
        } else if (data.code === 201) {
          app &&
            app.noImgGetAuth(() => {
              if (app && app.globalData.ajaxCount === 1) {
                const pages = getCurrentPages();
                //获取当前页面的对象
                console.log(pages);
                const view = pages[pages.length - 1];
                view && view.onShow();
              }

              wx.showToast({
                title: "登录信息过期，请刷新页面重试"
              });
            });
          resolve(data);
        } else {
          reject(data);
        }
      },
      fail(err) {
        console.log("rejected");
        console.log(err);
        wx.showToast({
          title: err.message ? err.message : "请求错误",
          icon: "none"
        });
        reject(err);
      },
      complete() {
        app && app.globalData.ajaxCount--;
        if (app && app.globalData && app.globalData.ajaxCount === 0) {
          wx.hideLoading();
        }
      }
    });
  }).catch(err => {
    console.log(err);
    const errMsg = err.message || err.data;
    wx.showToast({
      title: errMsg ? errMsg : "请求错误",
      icon: "none"
    });
    return Promise.reject(err);
  });
}
export default request;
