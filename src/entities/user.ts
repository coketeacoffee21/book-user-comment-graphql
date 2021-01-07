import { prop as Property, getModelForClass, ReturnModelType } from '@typegoose/typegoose'
import { getOptimisticModel } from '../core'
import { BaseDocument } from '../interfaces/BaseDocument'

export class User extends BaseDocument {
  @Property({ required: true })
  name: string

  @Property({ required: true })
  avatar: string
}

export const UserModel = getOptimisticModel(User)
