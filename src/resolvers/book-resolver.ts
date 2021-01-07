import { Resolver, Query } from 'type-graphql'
import { getOptimisticModel } from '../core'

import { Book as BookC, BookModel } from '../entities/book'
import { Book as BookS } from '../schemas/book'

@Resolver(() => BookS)
export class BookResolver {
  // @Query(() => [BookS])
  // async books(): Promise<BookS[]> {
  //   // const BookModel = getOptimisticModel(BookC)
  //   return await BookModel.find({})
  // }
}
