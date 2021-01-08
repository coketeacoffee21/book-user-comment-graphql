import { Resolver, Query, Arg, FieldResolver, Root } from 'type-graphql'
import { Book as BookC, BookModel } from '../entities/book'
import { UserModel } from '../entities/user'
import { Book as BookS } from '../schemas/book'
import { User as UserS } from '../schemas/user'

@Resolver(() => BookS)
export class BookResolver {
  @Query(() => BookS, { nullable: true })
  async book(@Arg('id') id: string): Promise<BookS | null> {
    const bookC = await BookModel.findById(id).lean()
    const books = bookC
      ? new BookS({
          ...bookC,
          id: bookC._id,
        })
      : null
    return books
  }

  @FieldResolver(() => UserS, { nullable: true })
  async author(@Root() book: BookS): Promise<UserS | null> {
    const resolved = await UserModel.findById(book.authorId).lean()
    return resolved
      ? new UserS({
          ...resolved,
          id: resolved._id,
        })
      : null
  }
}
