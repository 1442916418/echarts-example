import { getRandomInt, getRandomList, getGenerateArrayWithPrefix } from '../../utils/common.js'

export const getBarVirtualData = () => {
  return {
    seriesData: {
      T1: {
        name: '报警器1',
        data: getRandomList(8)
      },
      T2: {
        name: '报警器2',
        data: getRandomList(8)
      },
      T3: {
        name: '报警器3',
        data: getRandomList(8)
      },
      T4: {
        name: '报警器4',
        data: getRandomList(8)
      }
    },
    xAxisDataList: getGenerateArrayWithPrefix(8, '', 'Month')
  }
}

export const getBarVirtualData1 = () => {
  const lens = new Array(5).fill('')
  const result = {
    xAxisDataList: getGenerateArrayWithPrefix(5, '车辆'),
    seriesDataList: [],
    seriesDataList1: []
  }

  lens.forEach(() => {
    result.seriesDataList.push(getRandomInt(80, 300))
    result.seriesDataList1.push(getRandomInt(50, 140))
  })

  return result
}

export const getBarVirtualData2 = () => {
  return {
    xAxisDataList: getGenerateArrayWithPrefix(5, '', 'Month'),
    legendDataList: [{ name: '报警器1' }, { name: '报警器2' }],
    seriesDataList: { 报警器1: getRandomList(5, 1, 10), 报警器2: getRandomList(5, 10, 20) }
  }
}

export const getBarVirtualData3 = () => {
  return {
    xAxisDataList: getGenerateArrayWithPrefix(12, '', 'Month'),
    legendDataList: [{ name: '产品A' }, { name: '产品B' }],
    seriesDataList: { 产品A: getRandomList(12), 产品B: getRandomList(12) }
  }
}

export const getBarVirtualData4 = () => {
  return {
    xAxisDataList: getGenerateArrayWithPrefix(6, '', 'Month'),
    seriesDataList: getRandomList(6, 1, 100)
  }
}

export const getBarVirtualData5 = () => {
  return {
    yAxisDataList: getGenerateArrayWithPrefix(5, '', 'F'),
    seriesDataList: getRandomList(5),
    seriesDataList1: getRandomList(5)
  }
}

export const getBarVirtualData6 = () => {
  const xAxisDataList = []
  const seriesDataList = []
  const seriesDataList1 = []

  for (let i = 0; i < 100; i++) {
    xAxisDataList.push('A' + i)
    seriesDataList.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
    seriesDataList1.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5)
  }

  return {
    xAxisDataList,
    seriesDataList,
    seriesDataList1
  }
}
