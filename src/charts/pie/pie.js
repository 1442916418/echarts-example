import * as virtualData from './data.js'
import { HexToRGBA } from '../../utils/common.js'

const PIE_BG_IMAGES = {
  ring: 'data:image/png;base64,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',
  point:
    'data:image/png;base64,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',
  circle:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhBAMAAADMnc9JAAAAFVBMVEUc6uIAAAAQ19EAz8sM1dEH1M4O1MyUD+znAAAAB3RSTlMaABkGFA0RGmDW5AAABMNJREFUeNrs1L1u20AQBODDIUidkKJqavjTHy0/gOQkPenEvZgg7/8IgcRII+iks0jergHD07L4MLe7NF+V8+VDvJb08eXPFvt8+/vrwfscW3x4GTDmx7Pj5+ji48Dlpwzod5rxRHrWmrMMKs1oIj3jxVpLM56Y/jy85gXGpkD5HEVkQXpXA8uaMcQ1AEPwOmlRukhi2nF+gVgLPEcR0x5AGCP5O4KYbjnB15IDT9NFgiA4k6QYBg0zg6QYC+Qwn+aIPcG7SWA3XewIjmrZThXX3NJxLUs3TVwCZlLyvJ4kpjyLsQGKKWJPcAK5Gy+uATM9KN1YMZsFmhxVQIz6piR348T1TNDYHG6MmAJmZiyKMWLHipMDtPeIvP3Zsba+X9wSnENiExBjrg3J0t0npqw4U7TFfWLDijMDuKDoX0bMC6EoUpGkC4qsKFCSolBFlgyIXFTBkr6YsGIk8jWRFWOJm7C4ZMVYZB0WO5jYItqQmLFiPLIKiY2ACLiACJj4wcoTZfaGYu2JQntDsr0lpqwYVyxuiQspsbwl9jAisbb1RMFH5bP6YgIjlByeKLap/NNRlHxUliw8UWpTua0UhR+V2+qLrCgQrHwxkxVrX2xgJAPnib2oaLGjKHobJItLcQEjGlteio20CHchbqVFu6HIMUoGBUXZMXKQFOXHyEFS7OVFu6Mo/VPlr5VipiDm1bmYwIjH4lxsVER3JvYq4o4iF0cy+YpipiKioriAUYgtKSY6Iih2OqJtT+I2NxrB5iRCR8xXRzFTElEdxSWMSmx9FBMtEUexURPdf7FTE9tBVDgOnscgQk1cDWKqJubFIGZ6HatBlD9HHuQgJnoi3kpsFEV3EDsYraAdRKVVpbjVE/PNQYRix9XbiKmiaAttEQcx0+xYDaK5lXcjLjXFz+pivRcXmuIndbHci4mmaNVFvH/RfHT8194Z5TQMA0EUjXoBKsH3Ztz0f48QVfAfcYLA/e+AQKqMKNCkWU+cllxgNHHjOruzLx/Xv8cVeAT1u5xe8Vb+H2/hnKM9PepPyGpFS9f/bmWN+o2V3afiq1Bx0FceFqqubIUe9TUrfSVQX+1UV3SR9FVrfWV+oe6DcAugy7tI+k6Zvhuo7nii0Xd11Z1r9uruPPQJBH3KQp0kQbNcWka1s9LlqSd1soutOr1mjTqhx0GdQoTLk5b6NKk6MctOnQqGL558Lr2QTMsn2AsvJOAnio9lJxFa9bSFNeqJEvbqqZmNejIIqY7pp/ttMZOkeorN0oli2dsK9uppxI144hJM4qlSoK9ocrbI2QPWVTUB/UDGW2zFk+x37MXT+tzXRiQI386Js2QJSskS8Q8I4RUSQkJNEl4l6SXQJOHjiD1kCYtZsZxJwkeTl0IkyU5Ml7J9zQStEEqYpYkkNM4V3LmW9kYMk4l2syTBVkvtAze+AjLhLPqipUsJk3ahw/3FFE0GPBgCUijZi2moGLTEV/Iwm2prk340OMwm99oESdoocm+EyywYQmA2ctwSGt/CKNMcIwi+xJG0ce7WksTOQ2nhwF+SNOOTRxPRf7dJWiQRPdu0H9cTzAbjyfbAN6ckCWS9EvR+gMyXWSF6f17P4xcKcFR+/rp+V/EVhpNrDYrv/YFTAbeNkvoAAAAASUVORK5CYII='
}

/**
 * 饼图
 * @description 自定义图案
 */
export const handlePieOptionsData = () => {
  const data = virtualData.getPieVirtualData()

  return {
    color: data.colors,
    legend: {
      show: true,
      bottom: '5%',
      left: 'center',
      icon: 'rect',
      itemWidth: 15,
      itemHeight: 15,
      itemGap: 10,
      data: data.legendDataList
    },
    grid: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
      containLabel: true
    },
    title: [
      {
        text: '部件总数',
        left: 'center',
        top: '40%',
        textStyle: {
          fontSize: 16,
          color: '#B5D9FF',
          fontWeight: 400
        }
      },
      {
        text: `${data.total}{suffix|个}`,
        left: 'center',
        top: '48%',
        textStyle: {
          fontSize: 32,
          color: '#23E5E3',
          fontWeight: 600,
          rich: {
            suffix: {
              fontSize: 12,
              color: '#B5D9FF',
              fontWeight: 400,
              verticalAlign: 'bottom',
              padding: [0, 0, 10, 0]
            }
          }
        }
      }
    ],
    series: [
      {
        name: '部件',
        type: 'pie',
        radius: [80, 90],
        data: data.seriesDataList
      },
      {
        name: '部件边框',
        type: 'pie',
        radius: [100, 102],
        data: data.seriesDataList
      }
    ],
    graphic: {
      elements: [
        {
          type: 'group',
          top: 'center',
          left: 'center',
          children: [
            {
              type: 'image',
              x: 0,
              y: 0,
              style: {
                image: PIE_BG_IMAGES.ring,
                width: 140,
                height: 140
              },
              originX: 70,
              originY: 70,
              // 旋转动画
              keyframeAnimation: [
                {
                  // 动画时长，单位 ms
                  duration: 6000,
                  // 设置旋转动画是否循环
                  loop: true,
                  // 动画的关键帧
                  keyframes: [
                    {
                      // percent为关键帧的位置，0 为第一个，1 为最后一个
                      percent: 0,
                      easing: 'linear',
                      rotation: 0
                    },
                    {
                      percent: 1,
                      easing: 'linear',
                      // 旋转角度采用弧度值
                      rotation: Math.PI * 2
                    }
                  ]
                }
              ]
            },
            {
              type: 'image',
              x: 15,
              y: 15,
              style: {
                image: PIE_BG_IMAGES.point,
                width: 110,
                height: 110
              },
              originX: 55,
              originY: 55
            },
            {
              type: 'image',
              x: 25,
              y: 25,
              style: {
                image: PIE_BG_IMAGES.circle,
                width: 90,
                height: 90
              },
              originX: 5,
              originY: 45
            }
          ]
        }
      ]
    }
  }
}

/**
 * 饼图
 * @description 间隔图
 */
export const handlePieOptionsData1 = () => {
  const data = virtualData.getPieVirtualData1()

  return {
    color: data.colors,
    title: [
      {
        text: '预警信息',
        left: 'center',
        bottom: 10,
        textStyle: {
          fontSize: 16,
          color: '#64D5E9',
          fontWeight: '400'
        }
      }
    ],
    tooltip: {
      show: true,
      padding: 0,
      extraCssText: 'box-shadow: 0 0 0 rgba(0, 0, 0, 0);',
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      formatter: (params) => {
        if (params.name === 'empty') {
          return ''
        }

        const { name, color, value, percent } = params

        const styles = `
                  --box-bg-color: ${HexToRGBA(color, 0.3)};
                  --bg-color: ${color};
                  --text-font-size: ${12}px;
                 `
        const setTxt = (v) => `<span style="color: ${color}">${v}</span>`

        // prettier-ignore
        const marker = `
                        <div class="tooltip-box" style="${styles}">
                          <div class="tooltip-box-list">
                            <div class="tooltip-box-list-circular"></div>
                            <div class="tooltip-box-list-txt">${setTxt(name)} ${value}${setTxt('条')}(${percent}${'%'})</div>
                          </div>
                        </div>
                         `
        return marker
      }
    },
    series: data.seriesDataList
  }
}

/**
 * 饼图
 * @description 间隔图
 */
export const handlePieOptionsData2 = () => {
  const data = virtualData.getPieVirtualData2()

  return {
    color: data.colors,
    title: [
      {
        text: `${data.total}{suffix|台}`,
        left: 'center',
        top: '33%',
        textStyle: {
          fontSize: 22,
          color: '#FFFFFF',
          fontWeight: '400',
          fontFamily: 'digital_dream_Fat_Skew_Narrow',
          rich: {
            suffix: {
              fontSize: 16,
              color: '#FFFFFF',
              verticalAlign: 'bottom'
            }
          }
        }
      },
      {
        text: '设备状态',
        left: 'center',
        bottom: 10,
        textStyle: {
          fontSize: 16,
          color: '#64D5E9',
          fontWeight: '400'
        }
      }
    ],
    tooltip: {
      show: true,
      padding: 0,
      extraCssText: 'box-shadow: 0 0 0 rgba(0, 0, 0, 0);',
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      formatter: (params) => {
        if (params.name === 'empty') {
          return ''
        }

        const { name, color, value, percent } = params

        const styles = `
                  --box-bg-color: ${HexToRGBA(color, 0.3)};
                  --bg-color: ${color};
                  --text-font-size: ${12}px;
                 `
        const setTxt = (v) => `<span style="color: ${color}">${v}</span>`

        // prettier-ignore
        const marker = `
                        <div class="tooltip-box" style="${styles}">
                          <div class="tooltip-box-list">
                            <div class="tooltip-box-list-circular"></div>
                            <div class="tooltip-box-list-txt">${setTxt(name)} ${value}${setTxt('台')}(${percent}${'%'})</div>
                          </div>
                        </div>
                         `
        return marker
      }
    },
    series: [
      {
        name: '设备状态',
        type: 'pie',
        center: ['50%', '40%'],
        radius: ['50%', '65%'],
        data: data.seriesDataList
      }
    ]
  }
}

/**
 * 饼图
 */
export const handlePieOptionsData3 = () => {
  const data = virtualData.getPieVirtualData3()

  return {
    color: data.colors,
    title: [
      {
        text: '告警信息',
        left: 'center',
        bottom: 15,
        textStyle: {
          fontSize: 16,
          color: '#64D5E9',
          fontWeight: '400'
        }
      }
    ],
    tooltip: {
      show: true,
      padding: 0,
      extraCssText: 'box-shadow: 0 0 0 rgba(0, 0, 0, 0);',
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      formatter: (params) => {
        if (params.name === 'empty') {
          return ''
        }

        const { name, color, value, percent } = params

        const styles = `
                  --box-bg-color: ${HexToRGBA(color, 0.3)};
                  --bg-color: ${color};
                  --text-font-size: ${12}px;
                 `
        const setTxt = (v) => `<span style="color: ${color}">${v}</span>`

        // prettier-ignore
        const marker = `
                        <div class="tooltip-box" style="${styles}">
                          <div class="tooltip-box-list">
                            <div class="tooltip-box-list-circular"></div>
                            <div class="tooltip-box-list-txt">${setTxt(name)} ${value}${setTxt('条')}(${percent}${'%'})</div>
                          </div>
                        </div>
                         `
        return marker
      }
    },
    series: [
      {
        name: '全部告警',
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['50%', '65%'],
        data: data.seriesDataList
      }
    ]
  }
}

/**
 * 饼图
 */
export const handlePieOptionsData4 = () => {
  const { per, value, total, color } = virtualData.getPieVirtualData4()

  return {
    color: [color],
    title: [
      {
        text: per + '%',
        left: 'center',
        top: 'center',
        textStyle: {
          fontSize: 26,
          color: '#fff',
          fontWeight: '400'
        }
      },
      {
        text: '处理中',
        left: 'center',
        bottom: 0,
        textStyle: {
          fontSize: 18,
          color,
          fontWeight: '400'
        }
      }
    ],
    series: [
      // 内圆
      {
        type: 'pie',
        radius: ['0', '45%'],
        center: ['50%', '50%'],
        z: 0,
        itemStyle: {
          color,
          opacity: 0.25
        },
        label: {
          position: 'center'
        },
        data: [total]
      },
      // 进度圈
      {
        type: 'pie',
        clockwise: true,
        z: 1,
        radius: ['52%', '54%'],
        center: ['50%', '50%'],
        data: [
          {
            value: value,
            itemStyle: {
              borderWidth: 2,
              borderColor: color
            },
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          },
          {
            name: '',
            value: total - value,
            itemStyle: {
              color: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)',
              borderWidth: 0
            },
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        ],
        label: {
          show: false
        }
      }
    ]
  }
}

export const handlePieOptionsData5 = () => {
  const data = virtualData.getPieVirtualData5()

  return {
    color: data.colors,
    title: [
      {
        text: '当月新增',
        left: 'center',
        top: '40%',
        textStyle: {
          fontSize: 18,
          color: '#ffffff',
          fontWeight: '400'
        }
      },
      {
        text: `${data.total}{suffix|${data.suffix}}`,
        left: 'center',
        top: '50%',
        textStyle: {
          fontSize: 26,
          color: '#FFFFFF',
          fontWeight: '400',
          rich: {
            suffix: {
              fontSize: 16,
              color: '#FFFFFF'
            }
          }
        }
      }
    ],
    tooltip: {
      show: true,
      padding: 0,
      extraCssText: 'box-shadow: 0 0 0 rgba(0, 0, 0, 0);',
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      formatter: (params) => {
        if (params.name === 'empty') {
          return ''
        }

        const { name, color, value, percent } = params

        const styles = `
											--box-bg-color: ${HexToRGBA(color, 0.3)};
											--bg-color: ${color};
											--text-font-size: ${16}px;
										 `
        const setTxt = (v) => `<span style="color: ${color}">${v}</span>`

        // prettier-ignore
        const marker = `
                            <div class="tooltip-box" style="${styles}">
                              <div class="tooltip-box-list">
                                <div class="tooltip-box-list-circular"></div>
                                <div class="tooltip-box-list-txt">${setTxt(name)} ${value}${setTxt(data.suffix)}(${percent}${'%'})</div>
                              </div>
                            </div>
                             `
        return marker
      }
    },
    series: [
      {
        name: '当月新增',
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['50%', '63%'],
        data: data.seriesDataList
      }
    ]
  }
}

export const handlePieOptionsData6 = () => {
  const data = virtualData.getPieVirtualData6()

  return {
    color: data.colors,
    title: [
      {
        text: '天气概况',
        subtext: '外部圆: 历史平均值 内部圆: 2023',
        top: 0,
        left: 0,
        textStyle: {
          fontSize: 14,
          color: '#ffffff'
        },
        subtextStyle: {
          fontSize: 12,
          color: '#cccccc'
        }
      },
      {
        text: '年份',
        subtext: '2023',
        top: '40%',
        left: 'center',
        textStyle: {
          fontSize: 16,
          color: '#ffffff'
        },
        subtextStyle: {
          fontSize: 26,
          color: '#ffffff',
          fontWeight: 'bold'
        }
      }
    ],
    legend: {
      data: data.legendDataList,
      itemWidth: 5,
      itemHeight: 5,
      itemGap: 40,
      left: 'center',
      bottom: 0,
      icon: 'circle',
      textStyle: {
        color: '#ffffff'
      }
    },
    tooltip: {
      show: true,
      extraCssText: 'box-shadow: 0 0 0 rgba(0, 0, 0, 0);',
      borderColor: 'transparent',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      color: '#ffffff',
      formatter: '{a} <br /> {c}'
    },
    series: [
      {
        name: '2023',
        type: 'pie',
        radius: ['35%', '48%'],
        label: {
          show: false
        },
        data: data.seriesDataList
      },
      {
        name: '历史平局值',
        type: 'pie',
        radius: ['52%', '56%'],
        label: {
          show: false
        },
        data: data.seriesDataList1
      }
    ]
  }
}
