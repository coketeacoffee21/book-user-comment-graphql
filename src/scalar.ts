import { GraphQLScalarType, Kind } from 'graphql'
import { ObjectId } from 'mongodb'

export const Void = new GraphQLScalarType({
  name: 'Void',

  description: 'Represents NULL values',

  serialize() {
    return null
  },

  parseValue() {
    return null
  },

  parseLiteral() {
    return null
  },
})

export const ObjectIdScalar = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'Mongo object id scalar type',
  serialize(value: unknown): string {
    // check the type of received value
    console.log('value', value)

    if (!(value instanceof ObjectId)) {
      throw new Error('ObjectIdScalar can only serialize ObjectId values')
    }
    return value.toHexString() // value sent to the client
  },
  parseValue(value: unknown): ObjectId {
    console.log('value', value)
    // check the type of received value
    if (typeof value !== 'string') {
      throw new Error('ObjectIdScalar can only parse string values')
    }
    return new ObjectId(value) // value from the client input variables
  },
  parseLiteral(ast): ObjectId {
    console.log('value', ast)
    // check the type of received value
    if (ast.kind !== Kind.STRING) {
      throw new Error('ObjectIdScalar can only parse string values')
    }
    return new ObjectId(ast.value) // value from the client query
  },
})
