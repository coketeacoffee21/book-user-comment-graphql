import { Types } from 'mongoose'
import { ID, Field, ObjectType } from 'type-graphql'
import { User } from '../entities/user'

export type Ref<T> = T | Types.ObjectId

@ObjectType()
export class Book implements Record<string, any> {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field(type => ID)
  authorId: string | Types.ObjectId

  @Field()
  publishDate: string

  constructor(private convertible: Record<keyof Book, Book[keyof Book]>) {
    Object.assign(this, convertible)
  }
}
