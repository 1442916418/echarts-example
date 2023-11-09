import { getRandomInt, HexToRGBA } from '../../utils/common.js'

export const getPieVirtualData = () => {
  const colors = ['#BDFFFE', '#FF2A19']
  const analysisDataList = [
    {
      name: '正常',
      value: getRandomInt(0, 120),
      color: colors[0]
    },
    {
      name: '异常',
      value: getRandomInt(0, 30),
      color: colors[1]
    }
  ]
  const uom = '个'
  const seriesDataList = []
  const legendDataList = []

  const total = analysisDataList.reduce((sum, item) => sum + item.value, 0)

  analysisDataList.forEach(({ name, value, color }) => {
    const newName = `${name} ${value} ${uom}`

    legendDataList.push({
      name: newName,
      textStyle: {
        show: true,
        color,
        fontSize: 14,
        padding: [0, 0, 0, 10]
      },
      itemStyle: {
        show: true,
        color
      }
    })

    if (value) {
      seriesDataList.push({
        name: newName,
        value,
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        itemStyle: {
          color
        }
      })
    }
  })

  return {
    total,
    colors,
    legendDataList,
    seriesDataList
  }
}

export const getPieVirtualData1 = () => {
  const analysisDataList = [
    {
      name: '已处理',
      value: 456
    },
    {
      name: '处理中',
      value: 351
    },
    {
      name: '待处理',
      value: 261
    }
  ]
  const colors = ['#16AD55', '#1B63F2', '#EB5B26']
  const total = analysisDataList.reduce((sum, item) => sum + item.value, 0)
  const emptyValue = (total / 10) * 0.2

  const seriesDataList = analysisDataList.map((s, j) => {
    const radius = [
      ['65%', '70%'],
      ['35%', '65%'],
      ['20%', '25%']
    ]
    const dataList = []

    analysisDataList.forEach((v, i) => {
      dataList.push(
        {
          name: j ? 'empty' : v.name,
          value: v.value,
          label: {
            show: !j,
            formatter: '{name|{b}} {d}%',
            color: '#ffffff',
            fontSize: 12,
            rich: {
              name: {
                color: 'inherit',
                align: 'center',
                fontSize: 12
              }
            }
          },
          labelLine: {
            show: !j
          },
          itemStyle: {
            color: j === 1 ? HexToRGBA(colors[i], 0.1) : colors[i],
            shadowBlur: 10,
            shadowColor: j === 1 ? 'transparent' : colors[i]
          },
          emphasis: {
            label: {
              fontWeight: 'bold'
            },
            labelLine: {
              lineStyle: {
                width: 2
              }
            }
          }
        },
        {
          value: emptyValue,
          name: 'empty',
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          itemStyle: {
            color: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(0, 0, 0, 0)'
          }
        }
      )
    })

    return {
      name: '预警信息',
      type: 'pie',
      center: ['50%', '40%'],
      radius: radius[j],
      data: dataList
    }
  })

  return { seriesDataList, colors }
}

export const getPieVirtualData2 = () => {
  const analysisDataList = [
    {
      name: '正常',
      value: 111
    },
    {
      name: '异常',
      value: 10
    },
    {
      name: '未使用',
      value: 10
    }
  ]
  const colors = ['#1B63F2', '#F25D27', '#818181']
  const seriesDataList = []

  const total = analysisDataList.reduce((sum, item) => sum + item.value, 0)
  const emptyValue = (total / 10) * 0.2

  analysisDataList.forEach((v, i) => {
    seriesDataList.push(
      {
        name: v.name,
        value: v.value,
        label: {
          show: true,
          formatter: '{b} {d}%',
          color: '#ffffff',
          fontSize: 12
        },
        labelLine: {
          show: true
        },
        itemStyle: {
          color: colors[i],
          shadowBlur: 10,
          shadowColor: colors[i]
        },
        emphasis: {
          label: {
            fontWeight: 'bold'
          },
          labelLine: {
            lineStyle: {
              width: 2
            }
          }
        }
      },
      {
        value: emptyValue,
        name: 'empty',
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        itemStyle: {
          color: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(0, 0, 0, 0)'
        }
      }
    )
  })

  return { colors, seriesDataList, total }
}

export const getPieVirtualData3 = () => {
  const analysisDataList = [
    {
      name: '已处理',
      value: 1111
    },
    {
      name: '待处理',
      value: 100
    }
  ]
  const colors = ['#16AD55', '#D7235C', '#1B63F2']
  const seriesDataList = []

  analysisDataList.forEach((v, i) => {
    seriesDataList.push({
      name: v.name,
      value: v.value,
      label: {
        formatter: '{name|{b} {d}%}\n{hr|}\n{per|{c}}{suffix|条} ',
        color: '#fff',
        rich: {
          name: {
            color: '#fff',
            align: 'center',
            lineHeight: 25,
            fontSize: 12
          },
          hr: {
            width: '100%',
            height: 0,
            borderWidth: 1,
            borderType: 'dashed',
            borderColor: 'inherit'
          },
          per: {
            padding: [5, 5],
            color: 'inherit',
            fontSize: 14,
            borderRadius: 4,
            align: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0)'
          },
          suffix: {
            color: '#fff',
            fontSize: 10,
            align: 'center'
          }
        }
      },
      labelLine: {
        show: true
      },
      itemStyle: {
        color: colors[i],
        shadowBlur: 10,
        shadowColor: colors[i]
      }
    })
  })

  return { colors, seriesDataList }
}

export const getPieVirtualData4 = () => {
  const color = '#16AD55'
  const total = 100
  const value = getRandomInt(0, 100)
  const per = ((value / total) * 100).toFixed(0)

  return {
    total,
    value,
    per,
    color
  }
}

export const getPieVirtualData5 = () => {
  const analysisDataList = [
    {
      name: '北京市',
      value: getRandomInt(10, 300)
    },
    {
      name: '上海市',
      value: getRandomInt(10, 300)
    },
    {
      name: '江苏省',
      value: getRandomInt(10, 300)
    },
    {
      name: '广东省',
      value: getRandomInt(10, 300)
    },
    {
      name: '国外',
      value: getRandomInt(10, 300)
    }
  ]
  const colors = ['#FF1CA6', '#F2E11B', '#99F21B', '#1CF0FF', '#B41CFF']
  const seriesDataList = []
  const suffix = '个'
  const total = analysisDataList.reduce((sum, item) => sum + item.value, 0)

  analysisDataList.forEach((v, i) => {
    seriesDataList.push({
      name: v.name,
      value: v.value,
      label: {
        show: true,
        formatter: '{b} {d}%',
        color: '#ffffff',
        fontSize: 16
      },
      labelLine: {
        show: true
      },
      itemStyle: {
        color: colors[i],
        shadowBlur: 10,
        shadowColor: colors[i]
      },
      emphasis: {
        label: {
          fontWeight: 'bold'
        },
        labelLine: {
          lineStyle: {
            width: 2
          }
        }
      }
    })
  })

  return { colors, seriesDataList, suffix, total }
}

/**
 * https://www.msn.cn/zh-cn/weather/records/in-%E5%90%89%E6%9E%97%E7%9C%81,%E5%90%89%E6%9E%97%E5%B8%82?loc=eyJsIjoi5ZCJ5p6X5biCIiwiciI6IuWQieael%2BecgSIsImMiOiLkuK3ljY7kurrmsJHlhbHlkozlm70iLCJpIjoiY24iLCJ0IjoxMDIsImciOiJ6aC1jbiIsIngiOiIxMjYuNTQ5Mjg1ODg4NjcxODgiLCJ5IjoiNDMuODM4MTkxOTg2MDgzOTg0In0%3D&weadegreetype=C&ocid=ansmsnweather
 * https://echarts.apache.org/examples/zh/editor.html?c=pie-nest
 */
export const getPieVirtualData6 = () => {
  const getColor = (c1 = 'red', c2 = 'blue') => {
    return {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: c1
        },
        {
          offset: 1,
          color: c2
        }
      ],
      global: false // 缺省为 false
    }
  }
  const legendDataList = ['晴朗', '阴', '雨', '雪']
  const seriesDataList = legendDataList.map((name) => {
    return { value: getRandomInt(10, 100), name }
  })

  return {
    colors: [
      getColor('#FF4C14', '#FFE249'),
      getColor('#E700A7', '#FF49CC'),
      getColor('#BCFFFB', '#00FFF0'),
      getColor('#0EA6FF', '#0066FF')
    ],
    legendDataList,
    seriesDataList,
    seriesDataList1: seriesDataList
  }
}
