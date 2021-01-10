import { Resolver, Query, Arg, FieldResolver, Root, Int } from 'type-graphql'
import { UserModel, BookModel, CommentModel, Book } from '../entities'
import { Book as BookS, User as UserS, Comment as CommentS } from '../schemas/'
import { SORT_BY, SORT_ORDER } from '../enum'

function notNullorUndefined(it: any) {
  return it !== null && it !== undefined
}

function regexsBuilder(field: string, toMatch: Record<string, string | undefined>) {
  return Object.values(toMatch)
    .filter(i => i)
    .map(it => ({ [field]: { $regex: it, $options: 'i' } }))
}

async function findUserIdsBy(toMatch: Record<string, string | undefined>) {
  const authorConds = regexsBuilder('name', toMatch)
  if (authorConds.length) {
    const authorKeywordRegex = { $or: regexsBuilder('name', toMatch) }
    const users = await UserModel.find(authorKeywordRegex).select('_id name').lean()
    return users.map(it => it._id)
  } else {
    return []
  }
}

@Resolver(() => BookS)
export class BookResolver {
  @Query(() => [BookS]!)
  async listBooks(
    @Arg('skip', () => Int, { defaultValue: 0 }) skip: number,
    @Arg('limit', () => Int, { defaultValue: 20 }) limit: number,
    @Arg('sortBy', () => SORT_BY, { nullable: true }) sortBy: SORT_BY,
    @Arg('order', () => SORT_ORDER, { defaultValue: SORT_ORDER.asc }) order: SORT_ORDER,
    @Arg('bookName', { nullable: true }) bookName?: string,
    @Arg('authorName', { nullable: true }) authorName?: string,
    @Arg('keyword', { nullable: true }) keyword?: string,
  ): Promise<BookS[]> {
    const userIds = await findUserIdsBy({ keyword, authorName })
    const bookConds = [
      userIds.length ? { authorId: { $in: userIds } } : null,
      ...regexsBuilder('name', { keyword, bookName }),
    ].filter(notNullorUndefined)
    const books = await BookModel.find()
      .or(bookConds)
      .sort({ name: parseInt(order) })
      .skip(skip)
      .limit(limit)
      .lean()

    return books.map(it => new BookS({ ...it, id: it._id }))
  }

  @Query(() => BookS, { nullable: true })
  async getBook(@Arg('id') id: string): Promise<BookS | null> {
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
    const user = await UserModel.findById(book.authorId).lean()
    return user
      ? new UserS({
          ...user,
          id: user._id,
        })
      : null
  }

  @FieldResolver(() => [CommentS]!)
  async comments(@Root() book: BookS): Promise<CommentS[]> {
    const comments = await CommentModel.find({ bookId: book.id }).lean()
    return comments.map(it => new CommentS({ ...it, id: it._id }))
  }
}
