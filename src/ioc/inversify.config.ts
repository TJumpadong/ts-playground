import { Container } from 'inversify'

import { SERVICE_IDENTIFIER, MODEL_IDENTIFIER } from '../constants/identifiers'

import CartModel from '../models/cart'
import OrderModel from '../models/order'
import ProductModel from '../models/product'

import OrderService from '../services/order'
import CartService from '../services/cart'
import ProductService from '../services/product'

import '../controllers/cart'
import '../controllers/home'
import '../controllers/order'
import '../controllers/product'

const container = new Container()

container.bind<CartModel>(MODEL_IDENTIFIER.CART).to(CartModel).inSingletonScope()
container.bind<OrderModel>(MODEL_IDENTIFIER.ORDER).to(OrderModel).inSingletonScope()
container.bind<ProductModel>(MODEL_IDENTIFIER.PRODUCT).to(ProductModel).inSingletonScope()

container.bind<CartService>(SERVICE_IDENTIFIER.CART).to(CartService)
container.bind<OrderService>(SERVICE_IDENTIFIER.ORDER).to(OrderService)
container.bind<ProductService>(SERVICE_IDENTIFIER.PRODUCT).to(ProductService)

export default container
