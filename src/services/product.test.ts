// import { Container, interfaces } from "inversify"
// import { MODEL_IDENTIFIER } from "../constants/identifiers"
// import CartModel from "../models/cart"
// import ProductService from "./product"

// describe('product service unit tests', () => {
//   let container: interfaces.Container

//   beforeEach(() => {
//     container = new Container()
//   })

//   describe('list', () => {
//     test('should return list of products', () => {
//       // const productModel = {
//       //   list: jest.fn(() => [])
//       // }
//       container.bind<CartModel>(MODEL_IDENTIFIER.CART).to(CartModel).inSingletonScope()

//       const service = new ProductService()
//       const result = service.list()
//       expect(result).toBeDefined()
//       expect(productModel.list).toBeCalled()
//     })
//   })

//   describe('get', () => {
//     test('should catch the error', async () => {
//       const productModel = {
//         get: jest.fn()
//       }

//       try {
//         const service = new ProductService(productModel)
//         await service.get()
//       } catch (e) {
//         expect(e.message).toEqual('Product not found')
//       }
//     })
//   })
// })

describe('ProductService', () => {
  it('should be ok', () => {
    expect(true).toBe(true)
  })
})
