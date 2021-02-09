import { getFixedNotation } from './number'

describe('utils - number', () => {
  describe('getFixedNotation', () => {
    test('fixed 2 notations by default', () => {
      const result = getFixedNotation(20.3333)
      expect(result).toBe(20.33)
    })

    test('round up numbers', () => {
      const result = getFixedNotation(20.8888)
      expect(result).toBe(20.89)
    })
    
    test('fixed notations to 0', () => {
      const result = getFixedNotation(20.8888, 0)
      expect(result).toBe(21)
    })
  })
})