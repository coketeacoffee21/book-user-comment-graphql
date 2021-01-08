import { ID, Field, ObjectType } from 'type-graphql'

@ObjectType()
export class User implements Record<string, any> {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  avatar: string

  constructor(private convertible: Record<keyof User, User[keyof User]>) {
    Object.assign(this, convertible)
  }
}
