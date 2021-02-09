export interface ICartItem {
  _id: string
  quantity: number
}

export interface ICart {
  _id?: string
  userId: string
  items: ICartItem[]
}

export interface ICartSummaryItem {
  _id: string
  name: string
  price: number
  images: string[]
  quantity: number
}

export interface ICartSummary {
  items: ICartSummaryItem[]
  price: number
  totalPrice: number
}
