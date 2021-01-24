const ProductService = require('./product')

describe('product service unit tests', () => {
  describe('list', () => {
    test('should return list of products', () => {
      const productModel = {
        list: jest.fn(() => [])
      }
      const service = new ProductService(productModel)
      const result = service.list()
      expect(result).toBeDefined()
      expect(productModel.list).toBeCalled()
    })
  })

  describe('get', () => {
    test('should catch the error', async () => {
      const productModel = {
        get: jest.fn()
      }

      try {
        const service = new ProductService(productModel)
        await service.get()
      } catch (e) {
        expect(e.message).toEqual('Product not found')
      }
    })
  })
})
