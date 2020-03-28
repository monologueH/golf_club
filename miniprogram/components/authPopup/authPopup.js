// components/authPopup/authPopup.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: false,
      observer: function(newVal, oldVal, changedPath) {
        if (newVal) {
          this.hideTab();
        } else {
          this.showTab();
        }
      }
    },
    title: {
      type: String,
      value: "请登录",
      observer: function(newVal, oldVal, changedPath) {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},
  detached() {
    this.showTab();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    hideTab() {
      wx.hideTabBar();
    },
    showTab() {
      wx.showTabBar();
    },
    onGotUserInfo(res) {
      this.showTab();
      wx.login({
        success: loginData => {
          this.triggerEvent("close");
          app.getAuth(loginData, res.detail).then(response => {
            if (res.detail.userInfo) {
              this.triggerEvent("confirmCb");
            }
          });
        }
      });
    },
    clickAuth() {
      this.triggerEvent("close");
    }
  }
});
