import { injectable } from 'inversify'
import { Model, model, Schema } from 'mongoose'
import { ICart, ICartDoc, ICartSummary, ICartSummaryItem } from '../interfaces/cart'
import { IProductDoc } from '../interfaces/product'
import { getFixedNotation } from '../utils/number'

@injectable()
class CartModel {
  protected model: Model<ICartDoc>

  constructor() {
    const cartSchema = new Schema<ICart>({
      userId: String,
      items: [{ _id: String, quantity: Number }]
    })

    this.model = model<ICartDoc>('Cart', cartSchema)
  }

  async getByOwnerId(userId: string): Promise<ICartDoc | null> {
    return this.model.findOne({ userId })
  }

  updateOrCreate(userId: string, cart: ICart) {
    return this.model.findOneAndUpdate({ userId }, cart, { new: true, upsert: true })
  }

  removeByOwnerId(userId: string) {
    return this.model.deleteOne({ userId })
  }

  getSummary(cart: ICart, products: IProductDoc[]): ICartSummary {
    const cartItems: ICartSummaryItem[] = []

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
      price + getFixedNotation(item.price * item.quantity),
      0
    )

    return {
      items: cartItems,
      price: cartPrice,
      totalPrice: getFixedNotation(cartPrice * 1.07)
    }
  }
}

export default CartModel
