import { ID, Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Comment {
  @Field(() => ID)
  id: string

  @Field()
  content: string

  @Field()
  author: string
}
