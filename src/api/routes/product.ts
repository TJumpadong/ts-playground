import { Router, Request, Response } from 'express'

import container from '../../inversify.config'
import { SERVICE_IDENTIFIER } from '../../constants/identifiers'
import ProductService from '../../services/product'
// import { IProductService } from '../../interfaces/product';

// TODO: testing -> remove this

const route = Router()

export default (app: Router) => {
  // const productService = container.get<IProductService>(SERVICE_IDENTIFIER.PRODUCT)
  const productService = container.get<ProductService>(SERVICE_IDENTIFIER.PRODUCT)

  app.use('/products', route)

  route.get('/', async (req: Request, res: Response) => {
    const products = await productService.list()
    return res.json(products).status(200)
  });

  route.get('/:productId', async (req: Request, res: Response, next: Function) => {
    try {
      // validate productId
      const { productId } = req.params
      const product = await productService.get(productId)

      res.json(product)
    } catch (err) {
      next(err)
    }
  })
};