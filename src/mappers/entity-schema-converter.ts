import { EntityConverter } from '.'
import { BookEntity, CommentEntity, UserEntity } from '../entities'
import { Book, Comment, User } from '../schemas'

// eslint-disable-next-line prettier/prettier
type CommentEntityPojoOrNull = Record<keyof CommentEntity, CommentEntity[keyof CommentEntity]> | null
type UserEntityPojoOrNull = Record<keyof UserEntity, UserEntity[keyof UserEntity]> | null
type BookEntityPojoOrNull = Record<keyof BookEntity, BookEntity[keyof BookEntity]> | null

export function toUserGQL(): EntityConverter<UserEntityPojoOrNull, User | null> {
  return (item: UserEntityPojoOrNull) =>
    item
      ? new User({
          ...item,
          id: item._id,
        })
      : null
}

export function toBookGQL(): EntityConverter<BookEntityPojoOrNull, Book | null> {
  return (item: BookEntityPojoOrNull) =>
    item
      ? new Book({
          ...item,
          id: item._id,
        })
      : null
}

export function toCommentGQL(): EntityConverter<CommentEntityPojoOrNull, Comment | null> {
  return (item: CommentEntityPojoOrNull) =>
    item
      ? new Comment({
          ...item,
          id: item._id,
        })
      : null
}
