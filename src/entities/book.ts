import { prop as Property, getModelForClass, ReturnModelType } from '@typegoose/typegoose'
import { getOptimisticModel } from '../core'
import { BaseDocument } from '../interfaces/BaseDocument'

export class Book extends BaseDocument {
  @Property({ required: true })
  name: string

  @Property({ required: true })
  author: string

  @Property({ required: true })
  publishDate: string
}

export const BookModel = getOptimisticModel(Book)
