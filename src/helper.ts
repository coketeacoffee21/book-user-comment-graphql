import { BookModel } from './entities/book'
import { User, UserModel } from './entities/user'

export async function seedDatabase(): Promise<User> {
  const defaultUser = new UserModel({
    name: 'test',
    avatar: 'MichalLytek',
  } as User)
  const createdUser = await defaultUser.save()

  const defaultBook = new BookModel({
    name: 'iambook',
    authorId: createdUser._id,
    publishDate: 'asdf',
  })
  const createdBook = await defaultBook.save()
  return defaultUser
}
