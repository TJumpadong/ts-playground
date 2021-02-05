import { NextFunction, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpGet, httpPost, httpPut, next, requestBody, requestParam, response } from "inversify-express-utils";
import { SERVICE_IDENTIFIER } from "../constants/identifiers";
import OrderService from "../services/order";

@controller('/orders')
class OrderController extends BaseHttpController {
  constructor(
    @inject(SERVICE_IDENTIFIER.ORDER) protected orderService: OrderService
  ) {
    super()
  }

  @httpGet('/')
  async list(
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const userId = this.httpContext.user.details._id as string
      const orders = await this.orderService.list(userId)
      return res.json(orders)
    } catch (err) {
      next(err)
    }
  }

  @httpPost('/')
  async create(
    @requestBody() orderDetails: { address: string },
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const userId = this.httpContext.user.details._id as string
      const { address } = orderDetails
      const order = await this.orderService.create(userId, address)
      return res.json(order)
    } catch (err) {
      next(err)
    }
  }

  @httpGet('/:orderId')
  async addProduct(
    @requestParam('orderId') orderId: string,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const userId = this.httpContext.user.details._id as string
      const order = await this.orderService.get(userId, orderId)
      return res.json(order)
    } catch (err) {
      next(err)
    }
  }
}

export default OrderController