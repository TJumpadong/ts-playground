import 'reflect-metadata'

import { Container } from 'inversify'

// import { IProductService } from './interfaces/product'

import ProductService from './services/product'
import ProductModel from './models/product'

import { SERVICE_IDENTIFIER, MODEL_IDENTIFIER } from "./constants/identifiers"

let container = new Container()

container.bind(MODEL_IDENTIFIER.PRODUCT).to(ProductModel)
// container.bind<IProductService>(SERVICE_IDENTIFIER.PRODUCT).to(ProductService)
container.bind(SERVICE_IDENTIFIER.PRODUCT).to(ProductService)

export default container