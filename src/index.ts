import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'

import { ObjectId } from 'mongodb'
import { Container } from 'typedi'
import * as path from 'path'
import { buildSchema, registerEnumType } from 'type-graphql'

import { UserEntity } from './entities'
import { ObjectIdScalar } from './scalar'
import { UserResolver, BookResolver, CommentResolver } from './resolvers'
import { seedDatabase } from './helper'
import { mongoose } from '@typegoose/typegoose'
import * as enums from './enum'

export interface Context {
  user: UserEntity
}

const MONGO_DB_URL = 'mongodb://localhost:27017/type-graphql'

async function bootstrap() {
  Object.keys(enums).forEach(enumKey =>
    registerEnumType((enums as any)[enumKey], {
      name: enumKey,
      description: '',
    }),
  )
  try {
    await mongoose.connect(MONGO_DB_URL)
    await mongoose.connection.db.dropDatabase()
    const defaultUser = await seedDatabase()
    // build TypeGraphQL executable schema
    const schema = await buildSchema({
      resolvers: [UserResolver, BookResolver, CommentResolver],
      emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
      globalMiddlewares: [],
      scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
      validate: false,
      container: Container,
    })

    // create mocked context
    // const context: Context = { user: defaultUser }
    const server = new ApolloServer({
      schema,
      context: (ctx: Context) => {
        // ctx.user = {
        //   _id: '5ff67f1b60a6df2a1f1f292e',
        // }
        return ctx
      },
    })
    const { url } = await server.listen(4000)
    console.log(`Server is running, GraphQL Playground available at ${url}`)
  } catch (err) {
    console.error(err)
  }
}

bootstrap()
