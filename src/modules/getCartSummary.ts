import { ICart, ICartItem } from '../interfaces/cart'
import { IProductDoc } from '../interfaces/product'

const limitFloatLength = (num: number): number => parseFloat(num.toFixed(2))

interface ICartSummaryItem {
  _id: string,
  name: string,
  price: number,
  images: Array<string>,
  quantity: number,
}

export interface ICartSummary {
  items: Array<ICartSummaryItem>,
  price: number,
  totalPrice: number,
}

const getCartSummary = (cart: ICart, products: Array<IProductDoc>): ICartSummary => {
  const cartItems: Array<ICartSummaryItem> = []

  cart.items.forEach(item => {
    const product = products.find(product => product._id === item._id)

    if (product) {
      cartItems.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        images: product.images,
        quantity: item.quantity || 0
      })
    }
  })

  const cartPrice: number = cartItems.reduce((price: number, item: ICartSummaryItem) =>
    price + limitFloatLength(item.price * item.quantity),
    0
  )

  return {
    items: cartItems,
    price: cartPrice,
    totalPrice: limitFloatLength(cartPrice * 1.07)
  }
}

export default getCartSummary
