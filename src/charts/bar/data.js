import { getRandomInt, getRandomList } from '../../utils/common.js'

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
    xAxisDataList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }
}

export const getBarVirtualData1 = () => {
  const lens = new Array(5).fill('')
  const result = {
    xAxisDataList: ['T1', 'T2', 'T3', 'T4', 'T5'],
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
    xAxisDataList: ['T1', 'T2', 'T3', 'T4', 'T5'],
    legendDataList: [{ name: 'A1' }, { name: 'A2' }],
    seriesDataList: { A1: getRandomList(5), A2: getRandomList(5) }
  }
}

export const getBarVirtualData3 = () => {
  return {
    xAxisDataList: ['T1', 'T2', 'T3', 'T4', 'T5'],
    legendDataList: [{ name: '今年' }, { name: '去年' }],
    seriesDataList: { 今年: getRandomList(5), 去年: getRandomList(5) }
  }
}
