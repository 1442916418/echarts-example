import { getBarVirtualData, getBarVirtualData1, getBarVirtualData2, getBarVirtualData3 } from './data.js'
import { HexToRGBA } from '../../utils/common.js'

export const handleBarOptionsData = () => {
  const colors = ['#05E07D', '#04A8E8', '#f6dc7d', '#86c6e2']
  const { seriesData, xAxisDataList } = getBarVirtualData()

  const legendData = []
  const series = []
  let index = 0

  for (const key in seriesData) {
    const { name, data } = seriesData[key]
    const color = colors[index]

    index++

    legendData.push({
      name,
      icon: 'rect',
      itemStyle: {
        color
      },
      textStyle: {
        color: '#8AB5BB'
      }
    })
    series.push({
      name,
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series',
        label: {
          show: true,
          position: 'top',
          color: '#fff'
        }
      },
      itemStyle: {
        color
      },
      data
    })
  }

  return {
    color: colors,
    grid: {
      top: '5%',
      right: '5%',
      bottom: '20%',
      left: '5%',
      containLabel: true
    },
    legend: [
      {
        left: 'center',
        bottom: '10%',
        icon: 'rect',
        itemGap: 80,
        itemWidth: 12,
        itemHeight: 12,
        data: legendData.slice(0, 2)
      },
      {
        left: 'center',
        bottom: 0,
        icon: 'rect',
        itemGap: 80,
        itemWidth: 12,
        itemHeight: 12,
        data: legendData.slice(2)
      }
    ],
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
      data: xAxisDataList,
      axisLabel: {
        fontSize: 12,
        formatter: '{value}',
        color: '#8AB5BB'
      },
      axisLine: {
        lineStyle: {
          color: '#3F4F53'
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
      name: '次',
      nameTextStyle: {
        fontSize: 12,
        color: '#8AB5BB'
      },
      axisLabel: {
        show: true,
        fontSize: 14,
        color: '#8AB5BB'
      },
      axisLine: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#3F4F53'
        }
      },
      axisTick: {
        show: false
      }
    },
    series
  }
}

const handleSvg = (shadowColor = '#1ED8EF', shadowBlur = 8) => {
  const svg = `
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                    x="0px" y="0px"
                    viewBox="0 0 32 128"
                    xml:space="preserve"
                >
                    <style>
                        .st2 {
                            fill: transparent;
                            stroke: ${shadowColor};
                            stroke-width: ${shadowBlur}px;
                            filter: url(#chart-inset-shadow);
                        }
                    </style>
                    <defs>
                        <filter id="chart-inset-shadow" width="200%" height="200%" x="-50%" y="-50%">
                        <feGaussianBlur in="SourceGraphic" result="gass" stdDeviation="${
                          shadowBlur * 0.75
                        }" />
                        <feMerge>
                          <feMergeNode in="gass" />
                        </feMerge>
                      </filter>
                    </defs>
                    <path class="st2" d="M0 0 L32 0 L32 128 L0 128 Z" />
                </svg>
            `

  const svgData = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
  const dom = window.URL || window.webkitURL || window
  const insetShadowUrl = dom.createObjectURL(svgData)

  return 'image://' + insetShadowUrl
}

export const handleBarOptionsData1 = () => {
  const colorList = ['#1ED8EF', '#3476E1']
  const names = ['km/h', 'km/h']
  const { xAxisDataList, seriesDataList, seriesDataList1 } = getBarVirtualData1()

  return {
    color: colorList,
    grid: {
      top: '20%',
      right: '5%',
      bottom: 0,
      left: '5%',
      containLabel: true
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
      data: xAxisDataList,
      axisLabel: {
        formatter: '{value}',
        color: '#ffffff'
      },
      axisLine: {
        lineStyle: {
          color: '#ffffff'
        }
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [
      {
        type: 'value',
        name: names[0],
        position: 'left',
        nameTextStyle: {
          fontSize: 14,
          color: colorList[0],
          padding: [0, 0, 0, 20]
        },
        axisLabel: {
          show: true,
          color: colorList[0],
          fontSize: 14
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      {
        type: 'value',
        name: names[1],
        position: 'right',
        nameTextStyle: {
          fontSize: 14,
          color: colorList[1]
        },
        axisLabel: {
          show: true,
          color: colorList[1],
          fontSize: 14
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      }
    ],
    series: [
      {
        name: names[0],
        data: seriesDataList,
        type: 'pictorialBar',
        symbol: handleSvg(colorList[0]),
        barWidth: 16,
        barGap: '15%'
      },
      {
        name: names[1],
        data: seriesDataList1,
        type: 'pictorialBar',
        yAxisIndex: 1,
        symbol: handleSvg(colorList[1]),
        barWidth: 16,
        barGap: '15%'
      }
    ]
  }
}

export const handleBarOptionsData2 = () => {
  const colorList = ['#F25D27', '#1B63F2']
  const linearColor = [
    [HexToRGBA(colorList[0], 0.16), colorList[0]],
    [HexToRGBA(colorList[1], 0.16), colorList[1]]
  ]
  const suffix = '个'

  const { xAxisDataList, legendDataList, seriesDataList } = getBarVirtualData2()
  const newSeriesDataList = []

  legendDataList.forEach((item, i) => {
    item.itemStyle = { color: colorList[i] }

    newSeriesDataList.push({
      name: item.name,
      data: seriesDataList[item.name],
      type: 'bar',
      barWidth: 10,
      barCategoryGap: 2,
      label: {
        show: true,
        color: '#ffffff',
        position: 'right',
        fontSize: 10
      },
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: linearColor[i][0]
            },
            {
              offset: 1,
              color: linearColor[i][1]
            }
          ],
          global: false
        }
      }
    })
  })

  return {
    color: colorList,
    grid: {
      top: '15%',
      right: 10,
      bottom: 0,
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
      data: legendDataList,
      formatter: function (name) {
        return `{name|${name}}`
      },
      textStyle: {
        rich: {
          name: {
            width: 55,
            fontSize: 10,
            color: '#fff',
            align: 'left'
          }
        }
      }
    },
    tooltip: {
      show: true,
      padding: 0,
      trigger: 'axis',
      extraCssText: 'box-shadow: 0 0 0 rgba(0, 0, 0, 0);',
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      axisPointer: {
        type: 'none'
      },
      formatter: (params) => {
        const setTxt = (txt, color) => `<span style="color: ${color}">${txt}</span>`

        const list = params.map((v) => {
          const color = colorList[v.seriesIndex]
          const styles = `
                            --line-height: ${20}px;
                            --bg-color: ${color};
                            --circular-size: ${8}px;
                            --text-font-size: ${12}px;
                            `
          return `
                  <div class="tooltip-box-list" style="${styles}">
                    <div class="tooltip-box-list-circular"></div>
                    <div class="tooltip-box-list-txt">${setTxt(v.seriesName, color)} <b>${
            v.value
          }</b> ${setTxt(suffix, color)}</div>
                  </div>
                  `
        })
        const marker = `<div class="tooltip-box">
                            ${list.join('\n')}
                          </div>`
        return marker
      }
    },
    xAxis: {
      type: 'value',
      name: suffix,
      axisLabel: {
        color: '#fff'
      },
      axisLine: {
        show: true,
        lineStyle: {
          fontSize: 10,
          color: '#78E7EB'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: HexToRGBA('#78E7EB', 0.3),
          type: 'dotted'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'category',
      boundaryGap: true,
      data: xAxisDataList,
      axisLabel: {
        formatter: (value) => {
          if (value.length > 3) {
            return `${value.substring(0, 3)}\n${value.substring(3)}`
          }

          return value
        },
        color: '#fff'
      },
      axisLine: {
        lineStyle: {
          color: '#78E7EB'
        }
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    series: newSeriesDataList
  }
}

export const handleBarOptionsData3 = () => {
  const colorList = ['#1B63F2', '#7957F9']
  const linearColor = [
    [colorList[0], '#154EBF'],
    [colorList[1], '#553DAD']
  ]
  const suffix = '条'

  const { xAxisDataList, legendDataList, seriesDataList } = getBarVirtualData3()
  const newSeriesDataList = []

  legendDataList.forEach((item, i) => {
    item.itemStyle = { color: colorList[i] }

    newSeriesDataList.push({
      name: item.name,
      data: seriesDataList[item.name],
      type: 'bar',
      barWidth: 8,
      barCategoryGap: 2,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: linearColor[i][0]
            },
            {
              offset: 1,
              color: linearColor[i][1]
            }
          ],
          global: false
        }
      }
    })
  })

  return {
    color: colorList,
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
      data: legendDataList,
      formatter: function (name) {
        return `{name|${name}}`
      },
      textStyle: {
        rich: {
          name: {
            width: 55,
            fontSize: 10,
            color: '#fff',
            align: 'left'
          }
        }
      }
    },
    tooltip: {
      show: true,
      padding: 0,
      trigger: 'axis',
      extraCssText: 'box-shadow: 0 0 0 rgba(0, 0, 0, 0);',
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      axisPointer: {
        type: 'none'
      },
      formatter: (params) => {
        const setTxt = (txt, color) => `<span style="color: ${color}">${txt}</span>`

        const list = params.map((v) => {
          const color = colorList[v.seriesIndex]
          const listStyles = `
                              --line-height: ${20}px;
                              --bg-color: ${color};
                              --circular-size: ${8}px;
                              --text-font-size: ${12}px;
                             `

          return `
                <div class="tooltip-box-list" style="${listStyles}">
                  <div class="tooltip-box-list-circular"></div>
                  <div class="tooltip-box-list-txt">${setTxt(v.seriesName, color)} <b>${v.value}</b>${setTxt(
            suffix,
            color
          )}</div>
                </div>
                `
        })
        const marker = `<div class="tooltip-box">
                          ${list.join('\n')}
                        </div>`
        return marker
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: xAxisDataList,
      axisLabel: {
        formatter: (value) => {
          if (value.length > 3) {
            return `${value.substring(0, 3)}\n${value.substring(3)}`
          }

          return value
        },
        color: '#fff'
      },
      axisLine: {
        lineStyle: {
          color: '#78E7EB'
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
      name: suffix,
      axisLabel: {
        color: '#fff'
      },
      axisLine: {
        show: true,
        lineStyle: {
          fontSize: 10,
          color: '#78E7EB'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: HexToRGBA('#78E7EB', 0.3),
          type: 'dotted'
        }
      },
      axisTick: {
        show: false
      }
    },
    series: newSeriesDataList
  }
}
