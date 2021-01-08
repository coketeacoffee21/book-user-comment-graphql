import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { getOptimisticModel } from '../core'
import { BaseDocument } from '../interfaces/BaseDocument'

export class Comment extends BaseDocument {
  @Property({ required: true })
  content: string

  @Property({ required: true })
  author: Types.ObjectId
}

export const CommentModel = getOptimisticModel(Comment)
