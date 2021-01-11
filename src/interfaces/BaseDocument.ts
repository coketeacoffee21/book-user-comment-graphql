import { Expose, Transform } from 'class-transformer'
import { Types } from 'mongoose'

export type EntityConverter<T, R> = (self: T) => R

interface EntityConvertible {
  transform<R>(mapper: EntityConverter<this, R>): R
}

export abstract class BaseDocument implements EntityConvertible {
  @Expose()
  @Transform(
    // deserialize ObjectId into a string
    (value: any) => (value instanceof Types.ObjectId ? value.toHexString() : value),
    { toClassOnly: true },
  )
  readonly _id: any

  @Expose()
  readonly updatedAt: Date

  @Expose()
  readonly createdAt: Date
  /**
   * use countDocuments instead
   */
  static count: never

  transform<R>(mapper: EntityConverter<this, R>): R {
    return mapper(this)
  }
}
