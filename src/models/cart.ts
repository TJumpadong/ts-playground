import { injectable } from 'inversify'
import { Model, model, Schema } from 'mongoose'
import { ICart, ICartDoc, ICartSummary, ICartSummaryItem } from '../interfaces/cart'
import { IProductDoc } from '../interfaces/product'
import { getFixedNotation } from '../utils/number'

@injectable()
class CartModel {
  protected model: Model<ICartDoc>

  constructor () {
    const cartSchema = new Schema<ICart>({
      userId: String,
      items: [{ _id: String, quantity: Number }]
    })

    this.model = model<ICartDoc>('Cart', cartSchema)
  }

  async getByOwnerId (userId: string): Promise<ICartDoc | null> {
    return await this.model.findOne({ userId })
  }

  async updateOrCreate (userId: string, cart: ICart): Promise<ICartDoc> {
    return await this.model.findOneAndUpdate({ userId }, cart, { new: true, upsert: true })
  }

  async removeByOwnerId (userId: string): Promise<void> {
    await this.model.deleteOne({ userId })
  }

  getSummary (cart: ICart, products: IProductDoc[]): ICartSummary {
    const cartItems: ICartSummaryItem[] = []

    cart.items.forEach(item => {
      const product = products.find(product => product._id === item._id)

      if (product !== undefined) {
        cartItems.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          images: product.images,
          quantity: item.quantity
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
