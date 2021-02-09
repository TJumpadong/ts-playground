import { NextFunction, Response } from 'express'
import { inject } from 'inversify'
import { BaseHttpController, controller, httpGet, httpPost, next as nextFunction, requestBody, requestParam, response } from 'inversify-express-utils'
import { JsonResult } from 'inversify-express-utils/dts/results'

import { SERVICE_IDENTIFIER } from '../constants/identifiers'

import OrderService from '../services/order'

@controller('/orders')
class OrderController extends BaseHttpController {
  constructor (
    @inject(SERVICE_IDENTIFIER.ORDER) protected orderService: OrderService
  ) {
    super()
  }

  @httpGet('/')
  async list (
    @response() res: Response,
      @nextFunction() next: NextFunction
  ): Promise<JsonResult | undefined> {
    try {
      const userId = this.httpContext.user.details._id as string
      const orders = await this.orderService.list(userId)
      return this.json(orders)
    } catch (err) {
      next(err)
    }
  }

  @httpPost('/')
  async create (
    @requestBody() orderDetails: { address: string },
      @response() res: Response,
      @nextFunction() next: NextFunction
  ): Promise<JsonResult | undefined> {
    try {
      const userId = this.httpContext.user.details._id as string
      const { address } = orderDetails
      const order = await this.orderService.create(userId, address)
      return this.json(order)
    } catch (err) {
      next(err)
    }
  }

  @httpGet('/:orderId')
  async addProduct (
    @requestParam('orderId') orderId: string,
      @response() res: Response,
      @nextFunction() next: NextFunction
  ): Promise<JsonResult | undefined> {
    try {
      const userId = this.httpContext.user.details._id as string
      const order = await this.orderService.get(userId, orderId)
      return this.json(order)
    } catch (err) {
      next(err)
    }
  }
}

export default OrderController
