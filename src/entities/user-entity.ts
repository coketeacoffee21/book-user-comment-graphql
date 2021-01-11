import { prop as Property } from '@typegoose/typegoose'
import { getOptimisticModel } from '../core'
import { BaseDocument } from '../interfaces/base-document'

export class UserEntity extends BaseDocument {
  @Property({ required: true })
  name: string

  @Property({ required: true })
  avatar: string
}

export const UserModel = getOptimisticModel(UserEntity)
