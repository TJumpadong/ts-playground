const SERVICE_IDENTIFIER = {
  CART: Symbol.for('CartService'),
  ORDER: Symbol.for('OrderService'),
  PRODUCT: Symbol.for('ProductService')
}

const MODEL_IDENTIFIER = {
  CART: Symbol.for('CartModel'),
  ORDER: Symbol.for('OrderModel'),
  PRODUCT: Symbol.for('ProductModel')
}

export {
  SERVICE_IDENTIFIER,
  MODEL_IDENTIFIER
}
