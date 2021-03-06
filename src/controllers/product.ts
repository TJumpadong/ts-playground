import { NextFunction } from 'express'
import { inject } from 'inversify'
import { BaseHttpController, controller, httpGet, next as nextFunction, requestParam } from 'inversify-express-utils'
import { JsonResult } from 'inversify-express-utils/dts/results'

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
    @nextFunction() next: NextFunction
  ): Promise<JsonResult | undefined> {
    try {
      const products = await this.productService.list()
      return this.json(products)
    } catch (err) {
      next(err)
    }
  }

  @httpGet('/:productId')
  async getById (
    @requestParam('productId') productId: string,
      @nextFunction() next: NextFunction
  ): Promise<JsonResult | undefined> {
    try {
      // TODO: validate productId
      const product = await this.productService.get(productId)
      return this.json(product)
    } catch (err) {
      next(err)
    }
  }
}

export default ProductController
