import { getRandomInt } from '../../utils/common.js'

export const getGaugeVirtualData = () => {
  return {
    name: 'A',
    data: getRandomInt(0, 60),
    uom: '%',
    isAlarm: Math.random() > 0.5,
    lowerRange: 0, // 初始下量程
    upperRange: 100, // 初始上量程
    lowerBound: 0, // 下阈值
    upperBound: getRandomInt(70, 100) // 上阈值
  }
}
