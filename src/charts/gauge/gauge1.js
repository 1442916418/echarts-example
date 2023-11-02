import * as virtualData from './data.js'

/**
 * 获取仪表盘默认参数
 */
const getGaugeDefaultParams = () => {
  const params = {
    startAngle: 180,
    endAngle: 0,
    clockwise: true,
    pointer: {
      show: false
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisLabel: {
      show: false
    },
    detail: {
      show: false
    },
    anchor: {
      show: false
    },
    title: {
      show: false
    }
  }

  return params
}

const computedColorRange = (num, total) => {
  return num <= 0 ? 0 : num / total
}

/**
 * 获取外围圈
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @param {Number} color 颜色
 * @param {Number} data 值
 * @param {Number} name name
 * @param {Boolean} isAlarm 是否告警
 */
const getOutsideCharts = (min, max, color, data, name, isAlarm) => {
  const def = getGaugeDefaultParams()
  const GAUGE_CHAT_ICON =
    'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAWCAYAAADeiIy1AAAAAXNSR0IArs4c6QAAAdhJREFUSEu91buPjWEQx/HPuEtEQRQ0NAqiUFDpFP4AFVGIAo1L41ZYUalQiEQssQmJQnQiWgU2Kp2CxIrYiAaJiCCMzOY9m3XsOfuedXnKN79nvu/M/Gae8J9ODMrJzDWoe+MR8bXt/VagzJyHg9iF1ZiLd7iLs3gdEdkPOiMoMxfjPLZjGQpa5wc+4wGO4GlE1LdpTxvQEA5gRVOy7kBfcAunIuLlrECZuRVXm3LN6VOajziJGxHxfjpdz4wycyVuYgvmt2j6c+zFo4j41q3vB7qI3VjSAlKS77iD4xHxrBUoM6vxF7CqR196sauE5cLLEfF2qui3jDJzLa5jc2PjlglNysZwDPci4lPn6y+gzFyIS9iJRYMSGn3N030cxZOO5btB+3CmmZcZrd/nR2q+hmv+IuJV6SaDZeYmjGA9+lm5baLjOI3bEfFhApSZy5uSlQlqvfytM1ouxGgHVHusStbWym1/pJbuFZyLzKzgj7FuQCu3hVUJ9xdoQ7ljyrJsG2AQ3aECbWvWfWcrDxKgrXaoQOW2h1jQ9taAuno6DhdoaTNgG/9Rj15M9Kix9x6cQK2fPxnU7mTfNM/McAdUq6dgO5qBrZd0tvNUK6iWa2VST/01jP0EL1eKIrvdpJ0AAAAASUVORK5CYII='

  return [
    {
      ...def,
      type: 'gauge',
      radius: '100%',
      center: ['50%', '70%'],
      min: min,
      max: max,
      splitNumber: 2,
      progress: {
        show: false,
        width: 28
      },
      axisLine: {
        show: true,
        roundCap: true,
        lineStyle: {
          width: 28,
          color
        }
      },
      data: [{ value: data, name }],
      title: {
        show: true,
        fontSize: 32,
        color: isAlarm ? '#FF5347' : '#B5D9FF',
        offsetCenter: [0, '25%']
      },
      detail: {
        show: true,
        color: isAlarm ? '#FF5347' : '#2F97FF',
        fontSize: 56,
        offsetCenter: [0, '-10%']
      },
      pointer: {
        icon: GAUGE_CHAT_ICON, // 箭头图标 base64
        length: '12%',
        width: 22,
        offsetCenter: [0, '-81%'], // 箭头位置
        itemStyle: {
          color: '#fff' // 箭头颜色
        }
      }
    }
  ]
}
/**
 * 获取外圈渐变色
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @param {Number} insideMin 内圈最小值
 * @param {Number} insideMax 内圈最大值
 * @param {Boolean} isAlarm 是否告警
 */
const getOutsideChartsLinearGradient = (min, max, insideMin, insideMax, isAlarm) => {
  if (insideMax > max) {
    insideMax = max
  }

  const defaultColor = '#2F97FF' // 蓝色
  const alarmColor = '#FF5347' // 红色

  let result = [[1, defaultColor]]

  if (isAlarm) {
    result = [[1, alarmColor]]
  } else {
    const total = min < 0 ? max + Math.abs(min) : max
    const maxRange = computedColorRange(min < 0 ? insideMax + Math.abs(min) : insideMax, total)
    const minRange = computedColorRange(insideMin < 0 ? Math.abs(insideMin) : insideMin, total)

    if (insideMin && insideMax && insideMin !== min && insideMax !== max) {
      result = [
        [minRange, alarmColor],
        [maxRange, defaultColor],
        [1, alarmColor]
      ]
    } else if (insideMin && insideMin !== min) {
      result = [
        [minRange, alarmColor],
        [1, defaultColor]
      ]
    } else if (insideMax && insideMax !== max) {
      result = [
        [maxRange, defaultColor],
        [1, alarmColor]
      ]
    }
  }

  return result
}

/**
 * 仪表盘
 * @description 根据上下限计算颜色
 */
export const handleGaugeOptionsData1 = () => {
  const { isAlarm, lowerRange, upperRange, lowerBound, upperBound, data, name } =
    virtualData.getGaugeVirtualData()

  const outsideColors = getOutsideChartsLinearGradient(
    +lowerRange,
    +upperRange,
    +lowerBound,
    +upperBound,
    isAlarm
  )
  const series = getOutsideCharts(+lowerRange, +upperRange, outsideColors, data, name, isAlarm)

  return {
    grid: {
      top: '2%',
      right: '2%',
      bottom: '2%',
      left: '2%',
      containLabel: true
    },
    series
  }
}
