interface IOrderItem {
  _id: string
  quantity: number
}

export interface IOrder {
  _id?: string
  address: string
  userId: string
  cartId: string
  items: IOrderItem[]
  price: number
  totalPrice: number
}
