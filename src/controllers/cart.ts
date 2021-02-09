import { NextFunction, Response } from 'express'
import { inject } from 'inversify'
import { BaseHttpController, controller, httpGet, httpPut, next as nextFunction, requestBody, response } from 'inversify-express-utils'
import { JsonResult } from 'inversify-express-utils/dts/results'
import { SERVICE_IDENTIFIER } from '../constants/identifiers'
import CartService from '../services/cart'

@controller('/carts')
class CartController extends BaseHttpController {
  constructor (
    @inject(SERVICE_IDENTIFIER.CART) protected cartService: CartService
  ) {
    super()
  }

  @httpGet('/')
  async getById (
    @response() res: Response,
      @nextFunction() next: NextFunction
  ): Promise<JsonResult| void> {
    try {
      const userId = this.httpContext.user.details._id as string
      const cartItemSummary = await this.cartService.getItemSummary(userId)
      return this.json(cartItemSummary)
    } catch (err) {
      next(err)
    }
  }

  @httpPut('/')
  async addProduct (
    @requestBody() newProduct: { productId: string, quantity: number },
      @response() res: Response,
      @nextFunction() next: NextFunction
  ): Promise<JsonResult | void> {
    try {
      const userId = this.httpContext.user.details._id as string
      const { productId, quantity } = newProduct
      const cartItemSummary = await this.cartService.update(userId, productId, quantity)
      return this.json(cartItemSummary)
    } catch (err) {
      next(err)
    }
  }
}

export default CartController
