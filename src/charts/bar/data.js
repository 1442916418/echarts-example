import { getRandomInt, getRandomList, getGenerateArrayWithPrefix } from '../../utils/common.js'

export const getBarVirtualData = () => {
  return {
    seriesData: {
      T1: {
        name: 'T1',
        data: getRandomList()
      },
      T2: {
        name: 'T2',
        data: getRandomList()
      },
      T3: {
        name: 'T3',
        data: getRandomList()
      },
      T4: {
        name: 'T4',
        data: getRandomList()
      }
    },
    xAxisDataList: getGenerateArrayWithPrefix(10)
  }
}

export const getBarVirtualData1 = () => {
  const lens = new Array(5).fill('')
  const result = {
    xAxisDataList: getGenerateArrayWithPrefix(),
    seriesDataList: [],
    seriesDataList1: []
  }

  lens.forEach(() => {
    result.seriesDataList.push(getRandomInt())
    result.seriesDataList1.push(getRandomInt())
  })

  return result
}

export const getBarVirtualData2 = () => {
  return {
    xAxisDataList: getGenerateArrayWithPrefix(),
    legendDataList: [{ name: 'A1' }, { name: 'A2' }],
    seriesDataList: { A1: getRandomList(5), A2: getRandomList(5) }
  }
}

export const getBarVirtualData3 = () => {
  return {
    xAxisDataList: getGenerateArrayWithPrefix(),
    legendDataList: [{ name: '今年' }, { name: '去年' }],
    seriesDataList: { 今年: getRandomList(5), 去年: getRandomList(5) }
  }
}

export const getBarVirtualData4 = () => {
  return {
    xAxisDataList: getGenerateArrayWithPrefix(),
    seriesDataList: getRandomList(5)
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
