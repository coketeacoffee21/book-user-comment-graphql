import { CommentModel } from './entities'
import { BookModel } from './entities/book'
import { User, UserModel } from './entities/user'

export async function seedDatabase(): Promise<User> {
  const defaultUser = new UserModel({
    name: 'some nice name',
    avatar: 'random',
  } as User)
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
