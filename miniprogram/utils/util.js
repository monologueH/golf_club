const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const GROUP_MAP = {
  A:1,
  B:2,
  C:3,
  D:4,
  E:5,
  F:6,
  G:7,
  H:8,
  I:9,
  J:10,
  K:11,
  L:12,
  M:13,
  N:14,
  O:15,
  P:16,
  Q:17,
  R:18,
  S:19,
  T:20,
  U:21,
  V:22,
  W:23,
  X:24,
  Y:25,
  Z:26
  
}
module.exports = {
  formatTime: formatTime,
  GROUP_MAP
}
