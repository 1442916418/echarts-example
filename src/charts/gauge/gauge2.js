import * as virtualData from './data.js'

/**
 * 获取仪表盘默认参数
 */
const getGaugeDefaultParams = () => {
  const params = {
    type: 'gauge',
    startAngle: 215,
    endAngle: -35,
    clockwise: true,
    pointer: {
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
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisLabel: {
      show: false
    }
  }

  return params
}
/**
 * 获取外围圈
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @param {String} color 颜色
 * @param {Number} data 值
 * @param {String} name 名称
 * @param {Boolean} isAlarm 是否告警
 * @param {String} uom 单位
 */
const getOutsideCharts = (min, max, color, data, name, isAlarm, uom) => {
  const def = getGaugeDefaultParams()
  const fontColor = isAlarm ? '#FF5347' : '#BAEFFE'

  return [
    // 最外层边框
    {
      ...def,
      radius: '70%',
      axisLine: {
        show: true,
        lineStyle: {
          // 控制宽度
          width: 1,
          color
        }
      }
    },
    // 仪表盘
    {
      ...def,
      radius: '65%',
      center: ['50%', '50%'],
      min: min,
      max: max,
      splitNumber: 10,
      progress: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          // 控制宽度
          width: 12,
          color
        }
      },
      data: [{ value: data, name }],
      title: {
        show: true,
        fontSize: 16,
        color: fontColor,
        offsetCenter: [0, '108%']
      },
      detail: {
        show: true,
        color: fontColor,
        offsetCenter: [0, '20%'],
        formatter(value) {
          return `{value|${value}}\n{unit|${uom}}`
        },
        rich: {
          value: {
            fontSize: 28,
            fontWeight: 500,
            color: fontColor
          },
          unit: {
            fontSize: 16,
            fontWeight: 400,
            color: fontColor,
            padding: [0, 0, 0, 0]
          }
        }
      },
      pointer: {
        icon: 'triangle',
        width: 6,
        offsetCenter: [0, '-50%'], // 箭头位置
        itemStyle: {
          color: '#fff' // 箭头颜色
        }
      },
      axisTick: {
        show: false,
        distance: -25,
        splitNumber: 5,
        lineStyle: {
          width: 1,
          color: '#257F8B'
        }
      },
      splitLine: {
        show: false,
        distance: -30,
        length: 14,
        lineStyle: {
          width: 1,
          color: '#257F8B'
        }
      },
      axisLabel: {
        color: '#257F8B',
        distance: -10,
        fontSize: 14
      }
    }
  ]
}
const getGraphicCharts = () => {
  return {
    elements: [
      {
        type: 'group',
        left: 'center',
        top: 'middle',
        children: [
          {
            type: 'circle',
            shape: {
              cx: 0,
              cy: 0,
              r: 45
            },
            style: {
              fill: '#095652' // 固定填充色的圆形
            }
          },
          {
            type: 'circle',
            shape: {
              cx: 0,
              cy: 0,
              r: 45
            },
            style: {
              fill: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(18, 250, 242, 0)' // 圆心的颜色
                  },
                  {
                    offset: 0.9,
                    color: 'rgba(18, 250, 242, 0.1)' // 圆边缘接近的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(18, 250, 242, 0.3)' // 圆边缘的颜色
                  }
                ],
                global: false
              }
            }
          }
        ]
      }
    ]
  }
}
const computedColorRange = (num, total) => num / total
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

  const defaultColor = '#12FAF2' // 浅蓝色
  const alarmColor = '#FD206F' // 红色

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
export const handleGaugeOptionsData2 = () => {
  const { isAlarm, lowerRange, upperRange, lowerBound, upperBound, data, name, uom } =
    virtualData.getGaugeVirtualData()

  const outsideColors = getOutsideChartsLinearGradient(
    lowerRange,
    upperRange,
    lowerBound,
    upperBound,
    isAlarm
  )
  const series = getOutsideCharts(lowerRange, upperRange, outsideColors, data, name, isAlarm, uom)

  return {
    grid: {
      top: '2%',
      right: '2%',
      bottom: '2%',
      left: '2%',
      containLabel: true
    },
    series,
    graphic: getGraphicCharts()
  }
}
