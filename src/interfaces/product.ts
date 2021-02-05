import { Document } from 'mongoose'

export interface IProduct {
  name: string
  price: number
  images: string[]
}

export interface IProductDoc extends Document, IProduct {}
