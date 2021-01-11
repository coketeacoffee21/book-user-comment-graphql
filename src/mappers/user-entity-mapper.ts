import { EntityConverter } from '.'
import { UserEntity } from '../entities'
import { User } from '../schemas'

type UserEntityPojoOrNull = Record<keyof UserEntity, UserEntity[keyof UserEntity]> | null

export function toUserGQL(): EntityConverter<UserEntityPojoOrNull, User | null> {
  return (user: UserEntityPojoOrNull) =>
    user
      ? new User({
          ...user,
          id: user._id,
        })
      : null
}
