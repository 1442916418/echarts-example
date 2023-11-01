/**
 * 防抖
 * @param {Function} func 函数
 * @param {Number} delay 延迟时间(毫秒)
 */
export const debounce = (func, delay) => {
  let timeoutId = 0

  return function (...args) {
    timeoutId && clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      func.apply(this, args)
      timeoutId = 0
    }, delay)
  }
}

export const chunk = (str, size = 1) => {
  const chunked = []
  let index = 0
  while (index < str.length) {
    chunked.push(str.substr(index, size))
    index += size
  }
  return chunked
}

/**
 * Hex To RGBA
 * @param hex 十六进制
 * @param a 透明度
 * @returns rgba
 */
export const HexToRGBA = (hex, a = 1) => {
  const [r, g, b] = chunk(hex.slice(1), 2).map((c) => parseInt(c, 16))

  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export const customInterval = (callback, interval) => {
  let timerId = []

  const clear = () => {
    if (timerId.length) {
      timerId.forEach((id) => clearTimeout(id))
      timerId.length = 0
    }
  }
  const execute = () => {
    clear()

    try {
      callback()
    } catch (error) {
      console.log('customInterval ~ error:', error)
      clear()
      return
    }

    timerId.push(setTimeout(execute, interval))
  }

  // 首次调用
  timerId.push(setTimeout(execute, interval))

  return { clear }
}

/**
 * 随机整数
 */
export const getRandomInt = (min = 0, max = 10) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 随机浮点数
 */
export const getRandomFloat = (min = 1.1, max = 2) => {
  const randomFloat = Math.random() * (max - min) + min
  return parseFloat(randomFloat.toFixed(2))
}

export const getRandomList = (len = 10, min = 0, max = 10) => {
  return new Array(len).fill('').map(() => getRandomInt(min, max))
}
