// components/gameRulePanel/gameRulePanel.js
import { setGameRule, queryGameRule } from '../../api/index.js'

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

  /**
   * 组件的初始数据
   */
  data: {
    rules: [
      { value: 0, name: '普通' },
      { value: 1, name: '顶级8421' },
    ],
    groupTypes: [
      { value: 0, name: '根据前洞分组' },
      { value: 1, name: '使用创建比赛时的分组' },
    ],
    currentCheckedIndex:0,
    groupType: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    radioChange(e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value)
      this.setData({
        currentCheckedValue: e.detail.value
      })
    },
    saveRule(){
      console.log({
        gNo: this.data.gNo,
        pType: 0,
        pGroupType: 1
      })
      setGameRule({
        gNo: this.data.gNo,
        pType: 0,
        pGroupType: 1
      })
    },
    queryGameRule(){
      queryGameRule({
        gNo: this.data.gNo
      })
    },
    bindFormChange(e){
      console.log(e.detail.value)
      const { name } = e.currentTarget.dataset
      this.setData({
        [name]: parseInt(e.detail.value)
      })
    }
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    ready: function () {
      this.queryGameRule();
    },
  },
})
