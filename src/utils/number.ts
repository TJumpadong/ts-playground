'use strict'

const getFixedNotation = (num: number, digit = 2): number => parseFloat(num.toFixed(digit))

export {
  getFixedNotation
}
