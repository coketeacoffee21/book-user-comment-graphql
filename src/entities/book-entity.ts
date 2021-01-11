import { prop as Property } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { getOptimisticModel } from '../core'
import { BaseDocument } from '../interfaces/base-document'

export class BookEntity extends BaseDocument {
  @Property({ required: true })
  name: string

  @Property({ required: true })
  authorId: Types.ObjectId

  @Property({ required: true })
  publishDate: string
}

export const BookModel = getOptimisticModel(BookEntity)
