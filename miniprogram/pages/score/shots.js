export const shots = [
  {
    namecn: '标准杆'
  },
  {
    namecn: '小鸟'
  },
  {
    namecn: '老鹰'
  },
  {
    namecn: '信天翁'
  },
  {
    namecn: '秃鹫'
  },
]
export const standard = [
  {
    value: 1
  },
  {
    value: 2
  },
  {
    value: 3
  },
  {
    value: 4
  },
  {
    value: 5
  },
  {
    value: 6
  },
  {
    value: 7
  },
  {
    value: 8
  },
  {
    value: 9
  },
]
export const lanes = [{
    iconUrl: '/assets/image/Arrow up.png',
    value: 0
  },
  {
    iconUrl: '/assets/image/Turn left.png',
    value: 1
  },
  {
    iconUrl: '/assets/image/record-circle-line.png',
    value: 2
  },
  {
    iconUrl: '/assets/image/Turn right.png',
    value: 3
  },
  {
    iconUrl: '/assets/image/Arrow down.png',
    value: 4
  },
]
export function genScoreList(standard = 4) {
  if(!standard) standard = 1;
  const needShots = shots.slice(0, standard).reverse();
  console.log(needShots)
  const result = [];
  for (let i = 0; i < (standard + 14); i++) {
    if (standard > 5) {
      result.push({
        value: i + 1
      })
    } else if (i < standard) {
      result.push({
        ...needShots[i],
        value: i + 1
      })
    } else {
      result.push({
        namecn: '柏忌',
        value: i + 1
      })
    }
  }
  console.log(result)
  return result;
}
// export {shots}