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
      { value: 1, name: '普通8421' },
      { value: 2, name: '顶级8421' },
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
      setGameRule({
        gNo: this.data.gNo,
        pType: this.data.rules[this.data.currentCheckedIndex].value,
        pGroupType: this.data.groupTypes[this.data.groupType].value
      })
    },
    async queryGameRule(){
      const {data} = await queryGameRule({
        gNo: this.data.gNo
      })
      const {pType, pGroupType} = data;
      const currentCheckedIndex = this.data.rules.findIndex(item=>item.value === pType);
      const groupType = this.data.groupTypes.findIndex(item=>item.value === pGroupType);
      console.log(data,pType, pGroupType,currentCheckedIndex,
        groupType)
      this.setData({
        currentCheckedIndex,
        groupType
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
