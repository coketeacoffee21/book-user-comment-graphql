import { ID, Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Book {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  author: string

  @Field()
  publishDate: string
}
