// components/allScorePanel/allScorePanel.js
import { getAllScore,queryGameRule } from '../../api/index.js'
import {GROUP_MAP} from '../../utils/util'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    gNo: {
      type: String,
      value: ''
    },
    gameDetail:{
      type:Object,
      value:null
    }
  },
  observers: {
    'gameDetail': async function(gameDetail) {
      // 在 numberA 或者 numberB 被设置时，执行这个函数
      console.log(gameDetail)
      if(gameDetail && gameDetail.gPlaceInfoJSON && gameDetail.gPlaceInfoJSON.groundList){
      await this.queryGameRule();
      await this.getAllScore();
      }
    }
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    ready: function () {

    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    scoreInfo:[],
    pType:0,
    pGroupType:0,
    holeScoreList:[],
    colorMap:['#4796eb','#ec5b55'],
    GROUP_MAP
  },

  /**
   * 组件的方法列表
   */
  methods: {
    calcTotalScore(result){
      const holeNum = this.data.gameDetail.gPlaceInfoJSON.groundList.length * 8;
      console.log(holeNum)
      const scoreInfo = result.map(item=>item.scoreVoListNew);
      console.log(scoreInfo);
      const holeScoreList = scoreInfo[0].map((item,index)=>{
        const score = {};
        scoreInfo.forEach(userScore =>{
          ['A','B'].forEach(groupName=>{
            if(userScore[index].joyGroup === groupName){
              if(score[groupName]){
                score[groupName].gs += userScore[index].gs
                score[groupName].joyScore += userScore[index].joyScore
              }else{
                score[groupName] = {
                  gs:userScore[index].gs,
                  joyScore:userScore[index].joyScore,
                }
              }
            }
          })
        })
        return score;
      })
      this.setData({
        holeScoreList
      })
      console.log(holeScoreList[0])
    },
    async getAllScore(){
      getAllScore({gNo:this.data.gNo}).then(res=>{
        console.log(res.data)
        const result = res.data.map(user=>{
          user.scoreVoListNew = user.scoreVoList.reduce((t,c)=>{
            return [...t,...c.holeList];
          },[])
          return user;
        })
        this.calcTotalScore(result);
        this.setData({
          scoreInfo:result
        })
      })
    },
    async queryGameRule(){
      const {data} = await queryGameRule({
        gNo: this.data.gNo
      })
      const {pType, pGroupType} = data;
      this.setData({
        pType,
        pGroupType
      })
      console.log(this.data.pType)
    },
  },
})
