import { Resolver, Query, FieldResolver, Root } from 'type-graphql'
import { UserModel } from '../entities'

import { User as UserS, Comment as CommentS } from '../schemas'

@Resolver(() => CommentS)
export class CommentResolver {
  @FieldResolver(() => UserS, { nullable: true })
  async author(@Root() comment: CommentS): Promise<UserS | null> {
    const user = await UserModel.findById(comment.authorId).lean()
    console.log('asdasdtsss', false)

    return user
      ? new UserS({
          ...user,
          id: user._id,
        })
      : null
  }
}
