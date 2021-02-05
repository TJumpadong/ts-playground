import { NextFunction, Response } from 'express'
import { inject } from 'inversify'
import { BaseHttpController, controller, httpGet, next as nextFunction, requestParam, response } from 'inversify-express-utils'

import { SERVICE_IDENTIFIER } from '../constants/identifiers'
import ProductService from '../services/product'

@controller('/products')
class ProductController extends BaseHttpController {
  constructor (
    @inject(SERVICE_IDENTIFIER.PRODUCT) protected productService: ProductService
  ) {
    super()
  }

  @httpGet('/')
  async list (
    @response() res: Response,
      @nextFunction() next: NextFunction
  ): Promise<void> {
    try {
      const products = await this.productService.list()
      res.json(products)
    } catch (err) {
      next(err)
    }
  }

  @httpGet('/:productId')
  async getById (
    @requestParam('productId') productId: string,
      @response() res: Response,
      @nextFunction() next: NextFunction
  ): Promise<void> {
    try {
      // TODO: validate productId
      const product = await this.productService.get(productId)
      res.json(product)
    } catch (err) {
      next(err)
    }
  }
}

export default ProductController
