import { Resolver, Query } from 'type-graphql'

import { CommentModel } from '../entities/comment'
import { Comment as CommentS } from '../schemas/comment'

@Resolver(() => CommentS)
export class CommentResolver {
  @Query(() => [CommentS])
  async comments(): Promise<CommentS[]> {
    const userlist = await CommentModel.find({})
    return userlist
  }
}
