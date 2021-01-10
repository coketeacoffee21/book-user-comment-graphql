import { UserEntity, UserModel, CommentModel, BookModel } from './entities'

export async function seedDatabase(): Promise<UserEntity> {
  const defaultUser = new UserModel({
    name: 'some nice name',
    avatar: 'random',
  })
  const createdUser = await defaultUser.save()

  const defaultBook = new BookModel({
    name: 'data structure',
    authorId: createdUser._id,
    publishDate: 'asdf',
  })
  const createdBook = await defaultBook.save()

  const commentA = new CommentModel({
    content: "it's a good book.",
    authorId: defaultUser._id,
    bookId: createdBook._id,
  })

  const commentB = new CommentModel({
    content: 'nice book',
    authorId: defaultUser._id,
    bookId: createdBook._id,
  })

  commentA.save()
  commentB.save()
  return defaultUser
}
