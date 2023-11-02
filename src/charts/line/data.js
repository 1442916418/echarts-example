import { getRandomInt, getRandomList, getGenerateArrayWithPrefix, HexToRGBA } from '../../utils/common.js'

export const getLineVirtualData = () => {
  const colorList = ['#04BDF8', '#08FCDF']
  const xAxisDataList = getGenerateArrayWithPrefix(5, '', 'Day')
  const legendDataList = [{ name: '正常' }, { name: '异常' }]
  const seriesData = { 正常: getRandomList(5), 异常: getRandomList(5) }

  const seriesDataList = legendDataList.map((item, i) => {
    const curColor = colorList[i]

    return {
      name: item.name,
      type: 'line',
      data: seriesData[item.name],
      smooth: true,
      symbolSize: 20,
      showSymbol: false,
      lineStyle: {
        color: curColor,
        shadowBlur: 20,
        shadowColor: curColor
      },
      emphasis: {
        lineStyle: {
          color: curColor,
          shadowBlur: 20,
          shadowColor: curColor
        }
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
              color: HexToRGBA(curColor, 0.3)
            },
            {
              offset: 1,
              color: HexToRGBA(curColor, 0.1)
            }
          ],
          global: false
        }
      }
    }
  })

  return { colorList, xAxisDataList, legendDataList, seriesDataList }
}

export const getLineVirtualData1 = () => {
  const colorList = ['#1ED8EF', '#E7BC60']
  const legendDataList = [{ name: '每日消耗' }, { name: '上月平均每日消耗 ' }]
  const xAxisDataList = getGenerateArrayWithPrefix(10, '', 'Day')
  // 每日
  const seriesDataList = getRandomList(10, -10, 30)
  // 平均
  const seriesDataList1 = getRandomList(10, 5, 5)
  const exceedAvg5 = 5
  const exceedAvg15 = 15

  const min = seriesDataList.length ? Math.min(...seriesDataList) : 0
  const max = seriesDataList.length ? Math.max(...seriesDataList) : 0

  return {
    colorList,
    legendDataList,
    xAxisDataList,
    seriesDataList,
    seriesDataList1,
    exceedAvg5,
    exceedAvg15,
    min,
    max
  }
}

export const getLineVirtualData2 = () => {
  return {
    xAxisDataList: getGenerateArrayWithPrefix(10, '', 'Day'),
    seriesDataList: getRandomList(10, 1, 30)
  }
}

export const getLineVirtualData3 = () => {
  const list = new Array(20).fill(0).map(() => getRandomList(10, 1, 20))
  return {
    xAxisDataList: getGenerateArrayWithPrefix(10, '', 'Day'),
    seriesDataList: list,
    legendDataList: getGenerateArrayWithPrefix(20, 'A')
  }
}
