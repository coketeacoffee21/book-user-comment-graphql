import { Resolver, FieldResolver, Root } from 'type-graphql'
import { UserModel } from '../entities'
import { EntitySchemaMapper, toUserGQL } from '../mappers'
import { User, Comment } from '../schemas'

@Resolver(() => Comment)
export class CommentResolver {
  @FieldResolver(() => User, { nullable: true })
  async author(@Root() comment: Comment): Promise<User | null> {
    const user = await UserModel.findById(comment.authorId).lean()
    return EntitySchemaMapper.from(user, toUserGQL())
  }
}
