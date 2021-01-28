import { Document } from 'mongoose'

export interface IProduct {
  name: string,
  price: number,
  images: Array<string>,
}

export interface IProductDoc extends Document, IProduct {}