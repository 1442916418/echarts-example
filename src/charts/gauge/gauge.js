import * as virtualData from './data.js'

/**
 * 获取仪表盘默认参数
 */
const getGaugeDefaultParams = () => {
  return {
    startAngle: -120,
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
}

/**
 * 获取渐变色(默认蓝色)
 */
const getLinearGradient = (
  colors = [
    [0, 'rgba(94, 144, 242, 1)'],
    [1, 'rgba(94, 144, 242, 0.05)']
  ],
  x = 0,
  y = 0,
  x2 = 1,
  y2 = 0
) => {
  return {
    type: 'linear',
    x,
    y,
    x2,
    y2,
    colorStops: colors.map((v) => {
      return {
        offset: v[0],
        color: v[1]
      }
    }),
    global: false
  }
}

const computedColorRange = (num, total) => {
  return num <= 0 ? 0 : num / total
}

const computedColors = (type, opacity = 1) => {
  return `rgba(${type === 'RED' ? '242, 138, 119' : '94, 144, 242'}, ${opacity})`
}

/**
 * 获取内圈(2种颜色)
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @param {Number} data 值
 * @param {Object} colors 渐变色
 * @param {Boolean} isThree 是否 3 个区间颜色
 */
const getInsideCharts = (min, max, data, colors, isThree) => {
  const def = getGaugeDefaultParams()
  const w1 = isThree ? 85 : 55
  const w2 = isThree ? 55 : 85
  const r1 = isThree ? '50%' : '35%'
  const r2 = isThree ? '35%' : '50%'
  /**
   * 仪表盘指针
   */
  const CHART_POINTER =
    'path://M0,87.482a6.109,6.109,0,0,1,2.178-4.692L4,55.462a2,2,0,0,1,3.991,0L9.822,82.79A6.109,6.109,0,0,1,12,87.482a6.043,6.043,0,0,1-6,6.087A6.044,6.044,0,0,1,0,87.482Z'

  return [
    {
      ...def,
      type: 'gauge',
      radius: r1,
      center: ['50%', '50%'],
      min: min,
      max: max,
      splitNumber: 1,
      axisLine: {
        show: true,
        lineStyle: {
          width: w1,
          color: colors.gauge_0
        }
      }
    },
    {
      ...def,
      type: 'gauge',
      radius: r2,
      center: ['50%', '50%'],
      min: min,
      max: max,
      splitNumber: 1,
      axisLine: {
        show: true,
        lineStyle: {
          width: w2,
          color: colors.gauge_1
        }
      },
      pointer: {
        show: true,
        length: 40,
        offsetCenter: [0, '10%'],
        icon: CHART_POINTER,
        width: 12,
        itemStyle: {
          color: '#fff'
        }
      },
      data: [
        {
          value: data
        }
      ]
    }
  ]
}

/**
 * 获取最外围两个圈
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @param {String} colors 颜色
 */
const getOutsideCharts = (min, max, colors) => {
  const def = getGaugeDefaultParams()

  return [
    {
      ...def,
      type: 'gauge',
      radius: '80%',
      center: ['50%', '50%'],
      min: min,
      max: max,
      splitNumber: 2,
      axisLine: {
        show: true,
        lineStyle: {
          width: 5,
          color: colors
        }
      },
      axisTick: {
        distance: -15,
        splitNumber: 5,
        lineStyle: {
          width: 1,
          color: '#fff'
        }
      },
      splitLine: {
        show: false,
        distance: -20,
        length: 14,
        lineStyle: {
          width: 1,
          color: '#fff'
        }
      },
      axisLabel: {
        distance: -40,
        color: '#fff',
        fontSize: 20
      }
    },
    {
      ...def,
      type: 'gauge',
      radius: '75%',
      center: ['50%', '50%'],
      min: min,
      max: max,
      splitNumber: 2,
      axisLine: {
        show: true,
        lineStyle: {
          width: 15,
          color: colors
        }
      }
    }
  ]
}

/**
 * 获取内圈渐变色
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @param {Number} insideMin 内圈最小值
 * @param {Number} insideMax 内圈最大值
 */
const getInsideChartsLinearGradient = (min, max, insideMin, insideMax) => {
  const defaultLinearGradient = getLinearGradient([
    [0, computedColors('BLUE')],
    [1, computedColors('BLUE', 0.05)]
  ])
  const alarmLinearGradient = getLinearGradient([
    [0, computedColors('RED')],
    [1, computedColors('RED', 0.05)]
  ])
  const transparent = 'transparent'
  const maxRange = computedColorRange(insideMax, max)
  const minRange = computedColorRange(insideMin, max)

  const result = {
    gauge_0: [[1, defaultLinearGradient]],
    gauge_1: [[1, transparent]]
  }

  if (insideMin && insideMax && insideMin !== min && insideMax !== max) {
    Object.assign(result, {
      gauge_0: [
        [minRange, alarmLinearGradient],
        [maxRange, transparent],
        [1, alarmLinearGradient]
      ],
      gauge_1: [
        [minRange, transparent],
        [maxRange, defaultLinearGradient],
        [1, transparent]
      ]
    })
  } else if (insideMin && insideMin !== min) {
    Object.assign(result, {
      gauge_0: [
        [minRange, alarmLinearGradient],
        [1, transparent]
      ],
      gauge_1: [
        [minRange, transparent],
        [1, defaultLinearGradient]
      ]
    })
  } else if (insideMax && insideMax !== max) {
    Object.assign(result, {
      gauge_0: [
        [maxRange, defaultLinearGradient],
        [1, transparent]
      ],
      gauge_1: [
        [maxRange, transparent],
        [1, alarmLinearGradient]
      ]
    })
  }

  return result
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
  const defaultColor = computedColors('BLUE')
  const alarmColor = computedColors('RED')
  let result = [[1, defaultColor]]

  if (isAlarm) {
    result = [[1, alarmColor]]
  } else {
    const maxRange = computedColorRange(insideMax, max)
    const minRange = computedColorRange(insideMin, max)
    const coord = [0, 0.5, 1, 0]

    if (insideMin && insideMax && insideMin !== min && insideMax !== max) {
      result = [
        [
          1,
          getLinearGradient(
            [
              [0, alarmColor],
              [minRange, defaultColor],
              [maxRange, alarmColor]
            ],
            ...coord
          )
        ]
      ]
    } else if (insideMin && insideMin !== min) {
      result = [
        [
          1,
          getLinearGradient(
            [
              [0, alarmColor],
              [1 - minRange, defaultColor]
            ],
            ...coord
          )
        ]
      ]
    } else if (insideMax && insideMax !== max) {
      result = [
        [
          1,
          getLinearGradient(
            [
              [0, defaultColor],
              [1 - maxRange, alarmColor]
            ],
            ...coord
          )
        ]
      ]
    } else {
      result = [[1, defaultColor]]
    }
  }

  return result
}

/**
 * 仪表盘
 * @description 根据上下限计算颜色
 */
export const handleGaugeOptionsData = () => {
  const { isAlarm, lowerRange, upperRange, lowerBound, upperBound, data } = virtualData.getGaugeVirtualData()
  // 是否 3 个区间颜色
  const isThree = lowerBound !== 0

  const outsideColors = getOutsideChartsLinearGradient(
    lowerRange,
    upperRange,
    lowerBound,
    upperBound,
    isAlarm
  )
  const insideColors = getInsideChartsLinearGradient(lowerRange, upperRange, lowerBound, upperBound)
  const series = [
    ...getOutsideCharts(lowerRange, upperRange, outsideColors),
    ...getInsideCharts(lowerRange, upperRange, data, insideColors, isThree)
  ]

  return {
    grid: {
      top: '15%',
      right: '15%',
      bottom: '15%',
      left: '15%',
      containLabel: true
    },
    series
  }
}
