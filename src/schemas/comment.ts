import { ID, Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Comment {
  @Field(() => ID)
  id: string

  @Field()
  content: string

  @Field()
  author: string

  constructor(private convertible: Record<keyof Comment, Comment[keyof Comment]>) {
    Object.assign(this, convertible)
  }
}
