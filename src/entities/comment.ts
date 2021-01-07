import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { getOptimisticModel } from '../core'
import { BaseDocument } from '../interfaces/BaseDocument'

export class Comment extends BaseDocument {
  @Property({ required: true })
  content: string

  @Property({ required: true })
  author: string
}

export const CommentModel = getOptimisticModel(Comment)
