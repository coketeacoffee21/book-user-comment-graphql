import { User, UserModel } from './entities/user'

export async function seedDatabase(): Promise<User> {
  const defaultUser = new UserModel({
    name: 'test',
    avatar: 'MichalLytek',
  } as User)
  const abcd = await defaultUser.save()
  console.log('abcd', abcd)

  return defaultUser
}
