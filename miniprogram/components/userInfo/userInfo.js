// components/userInfo/userInfo.js、
import { getUserDetail } from "../../api/player.js";
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {},
  created(){
    this.getUserData();
  },
  attached() {
    // this.setNavColor();
    // this.getUserData();
  },
  /**
   * 组件的初始数据
   */
  data: {
    userInfo: {},
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getUserData() {
      getUserDetail().then(res=>{
        this.setData({
          userInfo:res.data
        })
        console.log(this.data.userInfo)
      })
    },
    setNavColor() {
      wx.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: "#b58e4a"
      });
    },
  }
});