import { Arg, FieldResolver, Int, Query, Resolver, Root } from 'type-graphql'
import { BookModel, CommentEntity, CommentModel, UserEntity, UserModel } from '../entities'
import { Book, Comment, User } from '../schemas/'
import { SORT_BY, SORT_ORDER } from '../enum'
import { EntitySchemaMapper, toBookGQL, toCommentGQL, toUserGQL } from '../mappers'

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

@Resolver(() => Book)
export class BookResolver {
  @Query(() => [Book]!)
  async listBooks(
    @Arg('skip', () => Int, { defaultValue: 0 }) skip: number,
    @Arg('limit', () => Int, { defaultValue: 20 }) limit: number,
    @Arg('sortBy', () => SORT_BY, { nullable: true }) sortBy: SORT_BY,
    @Arg('order', () => SORT_ORDER, { defaultValue: SORT_ORDER.asc }) order: SORT_ORDER,
    @Arg('bookName', { nullable: true }) bookName?: string,
    @Arg('authorName', { nullable: true }) authorName?: string,
    @Arg('keyword', { nullable: true }) keyword?: string,
  ): Promise<Book[]> {
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
    return books.map(it => EntitySchemaMapper.from(it, toBookGQL()) as Book)
  }

  @Query(() => Book, { nullable: true })
  async getBook(@Arg('id') id: string): Promise<Book | null> {
    const book = await BookModel.findById(id).lean()
    return EntitySchemaMapper.from(book, toBookGQL())
  }

  @FieldResolver(() => User, { nullable: true })
  async author(@Root() book: Book): Promise<User | null> {
    const user = await UserModel.findById(book.authorId).lean()
    return EntitySchemaMapper.from(user, toUserGQL())
  }

  @FieldResolver(() => [Comment]!)
  async comments(@Root() book: Book): Promise<Comment[]> {
    const comments = await CommentModel.find({ bookId: book.id }).lean()
    return comments.map(it => EntitySchemaMapper.from(it, toCommentGQL()) as Comment)
  }

  @FieldResolver(() => Int)
  async numComments(@Root() book: Book): Promise<number> {
    return await CommentModel.countDocuments({ bookId: book.id })
  }
}
