import { prop as Property } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { getOptimisticModel } from '../core'
import { BaseDocument } from '../interfaces/BaseDocument'

export class CommentEntity extends BaseDocument {
  @Property({ required: true })
  content: string

  @Property({ required: true })
  authorId: Types.ObjectId

  @Property({ required: true })
  bookId: Types.ObjectId
}

export const CommentModel = getOptimisticModel(CommentEntity)
