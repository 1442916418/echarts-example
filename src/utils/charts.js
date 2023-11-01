import * as echarts from 'https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.esm.min.js'

/**
 * 处理初始化图表
 * @param {String} elementId 容器 ID
 * @returns ECharts 实例
 */
export const handleInitChart = (elementId) => {
  if (!echarts) return

  const ele = document.getElementById(elementId)

  if (!ele) return

  const echartsInstance = echarts.init(ele)

  return echartsInstance
}

/**
 * 处理图表选项
 * @param {Object} echartsInstance ECharts 实例
 * @param {Object} options ECharts 选项
 */
export const handleChartOptions = (echartsInstance, options) => {
  if (!echartsInstance) return

  const optionsData = {
    ...options
  }

  echartsInstance.setOption(optionsData)
}
