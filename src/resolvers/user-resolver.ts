import { Resolver, Query } from 'type-graphql'

import { UserModel } from '../entities/user'
import { User as UserS } from '../schemas/user'

@Resolver(() => UserS)
export class UserResolver {
  @Query(() => [UserS])
  async users(): Promise<UserS[]> {
    const userlist = await UserModel.find({})
    return userlist
  }
}
