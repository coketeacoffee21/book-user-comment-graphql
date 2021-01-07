import { Resolver, Query } from 'type-graphql'

import { BookModel } from '../entities/book'
import { Book as BookS } from '../schemas/book'

@Resolver(() => BookS)
export class BookResolver {
  @Query(() => [BookS])
  async books(): Promise<BookS[]> {
    return await BookModel.find({})
  }
}
