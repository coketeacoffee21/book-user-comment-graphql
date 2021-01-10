import { Types } from 'mongoose'
import { ID, Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Comment {
  @Field(() => ID)
  id: string

  @Field()
  content: string

  authorId: Types.ObjectId

  bookId: Types.ObjectId

  constructor(private convertible: Readonly<Comment>) {
    Object.assign(this, convertible)
  }
}
