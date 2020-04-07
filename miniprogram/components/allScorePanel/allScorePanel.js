// components/allScorePanel/allScorePanel.js
import { getAllScore } from '../../api/index.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    gNo: {
      type: String,
      value: ''
    },
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    ready: function () {
      getAllScore({gNo:this.data.gNo}).then(res=>{
        console.log(res.data)
        const result = res.data.map(user=>{
          user.scoreVoListNew = user.scoreVoList.reduce((t,c)=>{
            return [...t,...c.holeList];
          },[])
          return user;
        })
        this.setData({
          scoreInfo:result
        })
      })
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    scoreInfo:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
