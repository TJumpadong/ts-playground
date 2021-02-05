import { Document } from 'mongoose'

export interface ICartItem {
  _id: string,
  quantity: number,
}

export interface ICart {
  userId: string,
  items: ICartItem[],
}

export interface ICartDoc extends Document, ICart {}