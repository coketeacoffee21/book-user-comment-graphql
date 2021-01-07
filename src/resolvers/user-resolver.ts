import { Resolver, Query } from 'type-graphql'

import { UserModel } from '../entities/user'
import { User as UserS } from '../schemas/user'

@Resolver(() => UserS)
export class UserResolver {
  @Query(() => [UserS])
  async users(): Promise<UserS[]> {
    const userlist = await UserModel.find({})
    UserModel.findByIdAndDelete
    UserModel.findById
    UserModel.findByIdAndDelete
    // return userlist
    console.log('userlist', userlist)
    return [
      {
        id: 'asd',
        name: '123',
        avatar: 'qwe',
      },
    ]
  }
}
