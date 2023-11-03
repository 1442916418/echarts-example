import * as virtualData from './data.js'
import { HexToRGBA } from '../../utils/common.js'

/** 折线图 */
export const handleLineOptionsData = () => {
  const data = virtualData.getLineVirtualData()

  return {
    color: data.colorList,
    grid: {
      top: '15%',
      right: 10,
      bottom: 10,
      left: 10,
      containLabel: true
    },
    legend: {
      orient: 'horizontal',
      top: 0,
      right: 0,
      icon: 'rect',
      itemWidth: 8,
      itemHeight: 8,
      data: data.legendDataList,
      formatter: function (name) {
        return `{name|${name}}`
      },
      textStyle: {
        rich: {
          name: {
            width: 40,
            fontSize: 14,
            color: '#ffffff',
            align: 'left'
          }
        }
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.xAxisDataList,
      axisLabel: {
        formatter: '{value}',
        color: '#B3B5B7'
      },
      axisLine: {
        lineStyle: {
          color: '#B3B5B7'
        }
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#B3B5B7'
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#B3B5B7'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: HexToRGBA('#B3B5B7', 0.3),
          type: 'dotted'
        }
      },
      axisTick: {
        show: false
      }
    },
    series: data.seriesDataList
  }
}

/**
 * 折线图
 * @description 超出平均值颜色变换
 */
export const handleLineOptionsData1 = () => {
  const data = virtualData.getLineVirtualData1()

  return {
    color: data.colorList,
    grid: {
      top: '10%',
      right: 10,
      bottom: '20%',
      left: '5%',
      containLabel: true
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      icon: 'rect',
      itemWidth: 32,
      itemHeight: 4,
      itemGap: 30,
      data: data.legendDataList,
      formatter: function (name) {
        return `{name|${name}}`
      },
      textStyle: {
        rich: {
          name: {
            fontSize: 16,
            color: '#ffffff',
            align: 'left'
          }
        }
      }
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: data.xAxisDataList,
      axisLabel: {
        formatter: '{value}',
        color: '#ffffff',
        fontSize: 14
      },
      axisLine: {
        lineStyle: {
          color: '#353B4B'
        }
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#ffffff',
        fontSize: 14
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#353B4B'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: HexToRGBA('#B3B5B7', 0.3),
          type: 'dashed'
        }
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        name: data.legendDataList[0].name,
        type: 'line',
        data: data.seriesDataList,
        symbolSize: 4,
        symbol: 'circle',
        showSymbol: true,
        lineStyle: {
          shadowBlur: 20,
          shadowColor: '#1ED8EF'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(30, 216, 239, 0.3)'
              },
              {
                offset: 1,
                color: 'rgba(30, 216, 239, 0.1)'
              }
            ],
            global: false
          }
        }
      },
      {
        name: data.legendDataList[1].name,
        type: 'line',
        data: data.seriesDataList1,
        symbolSize: 4,
        symbol: 'circle',
        showSymbol: true,
        lineStyle: {
          shadowBlur: 20,
          shadowColor: '#E7BC60',
          color: '#E7BC60'
        }
      }
    ],
    // https://echarts.apache.org/zh/option.html#visualMap-piecewise.type
    visualMap: [
      {
        type: 'piecewise',
        show: false,
        seriesIndex: 0,
        pieces: [
          // 范围 min ~ 平均范围 5
          {
            gt: data.min,
            lte: data.exceedAvg5,
            color: '#1ED8EF' // 浅蓝色
          },
          // 平均范围 5 ~ 15
          {
            gt: data.exceedAvg5,
            lte: data.exceedAvg15,
            // color: '#fe9ca5' // 浅红色
            color: '#d8ef1e' // 黄绿色(https://www.colorgg.com/d8ef1e)
          },
          // 平均范围 15 ~ max
          {
            gt: data.exceedAvg15,
            lte: data.max,
            color: '#FD5060' // 深红色
          }
        ]
      }
    ]
  }
}

/** 折线图 */
export const handleLineOptionsData2 = () => {
  const data = virtualData.getLineVirtualData2()

  return {
    grid: {
      top: '30%',
      right: '10%',
      bottom: '7%',
      left: 0,
      containLabel: true
    },
    title: [
      {
        text: '告警次数',
        left: 'center',
        top: 0,
        textStyle: {
          fontSize: 16,
          color: '#B5D9FF',
          fontWeight: 400
        }
      }
    ],
    tooltip: {
      trigger: 'axis'
    },
    series: [
      {
        name: '告警次数',
        type: 'line',
        data: data.seriesDataList,
        symbol: 'circle',
        symbolSize: 10,
        showSymbol: true,
        color: '#ffffff',
        lineStyle: {
          color: '#ffffff'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(255, 42, 25, 1)'
              },
              {
                offset: 0.3,
                color: 'rgba(255, 42, 25, 1)'
              },
              {
                offset: 1,
                color: 'transparent'
              }
            ],
            global: false
          }
        }
      }
    ],
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.xAxisDataList,
      axisLabel: {
        formatter: '{value}',
        fontSize: 12,
        color: '#ffffff',
        margin: 12
      },
      axisLine: {
        lineStyle: {
          color: '#ffffff',
          type: 'dashed'
        }
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: '#ffffff'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '次',
      nameTextStyle: {
        fontSize: 12,
        align: 'right',
        padding: [0, 10, 10, 0]
      },
      axisLabel: {
        fontSize: 12,
        color: '#ffffff',
        margin: 10
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#ffffff',
          type: 'dashed'
        }
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: '#ffffff'
        }
      }
    }
  }
}

export const handleLineOptionsData3 = () => {
  const data = virtualData.getLineVirtualData3()
  const newSeriesData = []

  data.seriesDataList.forEach((item, i) => {
    const name = data.legendDataList[i]

    newSeriesData.push({
      name,
      type: 'line',
      data: item,
      symbol: 'circle',
      symbolSize: 10,
      showSymbol: true,
      lineStyle: {
        width: 1
      },
      sampling: 'lttb'
    })
  })

  return {
    grid: {
      top: '10%',
      right: '30%',
      bottom: '2%',
      left: '2%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: [
      {
        type: 'scroll',
        top: '15%',
        right: 0,
        icon: 'rect',
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 6,
        align: 'left',
        orient: 'vertical',
        data: data.legendDataList,
        textStyle: {
          fontSize: 12,
          fontWeight: 500,
          color: '#2F97FF',
          padding: [0, 0, 0, 10],
          backgroundColor: 'transparent'
        }
      }
    ],
    series: newSeriesData,
    xAxis: {
      type: 'category',
      name: 'h',
      boundaryGap: false,
      data: data.xAxisDataList,
      axisLabel: {
        formatter: '{value}',
        fontSize: 12,
        color: '#ffffff',
        margin: 25
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#ffffff',
          type: 'solid'
        }
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: '#ffffff'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '°C',
      nameTextStyle: {
        fontSize: 12,
        align: 'right'
      },
      axisLabel: {
        fontSize: 12,
        color: '#ffffff',
        margin: 20
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#ffffff',
          type: 'solid'
        }
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: '#ffffff'
        }
      }
    }
  }
}
