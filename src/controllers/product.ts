import { NextFunction, Response } from 'express';
import { inject } from 'inversify';
import { BaseHttpController, controller, httpGet, next, requestParam, response } from 'inversify-express-utils'

import { SERVICE_IDENTIFIER } from '../constants/identifiers'
import ProductService from '../services/product';

@controller('/products')
class ProductController extends BaseHttpController {
  constructor(
    @inject(SERVICE_IDENTIFIER.PRODUCT) protected productService: ProductService
  ) {
    super()
  }

  @httpGet('/')
  async list(
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const products = await this.productService.list()
      return res.json(products)
    } catch (err) {
      next(err)
    }
  }

  @httpGet('/:productId')
  async getById(
    @requestParam('productId') productId: string,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      // TODO: validate productId
      const product = await this.productService.get(productId)
      return res.json(product)
    } catch (err) {
      next(err)
    }
  }
}

export default ProductController