const getCartItemSummary = require('./getCartItemSummary')
const mockObjectId = (val) => ({
  val,
  equals: term => val === term.val
})

describe('getCartItemSummary module unit tests', () => {
  test('cart empty', () => {
    const result = getCartItemSummary()
    expect(result).toEqual({
      items: [],
      price: 0,
      totalPrice: 0
    })
  })

  test('product not found', () => {
    const cart = {
      items: [{
        _id: mockObjectId('1'),
        quantity: 1
      }]
    }

    const result = getCartItemSummary(cart)
    expect(result).toEqual({
      items: [],
      price: 0,
      totalPrice: 0
    })
  })

  test('single item', () => {
    const cart = {
      items: [{
        _id: mockObjectId('1'),
        quantity: 1
      }]
    }
    const products = [{
      _id: mockObjectId('1'),
      price: 10
    }]

    const result = getCartItemSummary(cart, products)
    expect(result.items).toHaveLength(1)
    expect(result.price).toEqual(10)
    expect(result.totalPrice).toEqual(10.7)
  })

  test('multiple items', () => {
    const cart = {
      items: [{
        _id: mockObjectId('1'),
        quantity: 1
      }, {
        _id: mockObjectId('2'),
        quantity: 1
      }]
    }
    const products = [{
      _id: mockObjectId('1'),
      price: 10
    }, {
      _id: mockObjectId('2'),
      price: 10
    }]

    const result = getCartItemSummary(cart, products)
    expect(result.items).toHaveLength(2)
    expect(result.price).toEqual(20)
    expect(result.totalPrice).toEqual(21.4)
  })

  test('mixed items', () => {
    const cart = {
      items: [{
        _id: mockObjectId('1'),
        quantity: 1
      }, {
        _id: mockObjectId('2'),
        quantity: 2
      }]
    }
    const products = [{
      _id: mockObjectId('1'),
      price: 10
    }, {
      _id: mockObjectId('2'),
      price: 10
    }]

    const result = getCartItemSummary(cart, products)
    expect(result.items).toHaveLength(2)
    expect(result.price).toEqual(30)
    expect(result.totalPrice).toEqual(32.1)
  })
})
