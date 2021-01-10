import { Resolver, Query } from 'type-graphql'
import { UserModel } from '../entities'
import { User } from '../schemas/user'

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    const userlist = await UserModel.find({}).lean()
    return userlist.map(
      it =>
        new User({
          ...it,
          id: it._id,
        }),
    )
  }
}
