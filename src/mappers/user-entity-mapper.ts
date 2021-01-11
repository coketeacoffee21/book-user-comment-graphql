import { EntityConverter } from '../interfaces/BaseDocument'
import { UserEntity } from '../entities'
import { User } from '../schemas'

export function userEntityToGraphQL(): EntityConverter<UserEntity, User> {
  return (user: UserEntity) =>
    new User({
      ...user,
      id: user._id,
    })
}
