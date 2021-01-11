export type EntityConverter<T, R> = (self: T) => R

interface EntityConvertible {
  transform<R>(mapper: EntityConverter<this, R>): R
}

export abstract class BaseDocument implements EntityConvertible {
  readonly _id: any
  readonly updatedAt: Date
  readonly createdAt: Date
  /**
   * use countDocuments instead
   */
  static count: never

  transform<R>(mapper: EntityConverter<this, R>): R {
    return mapper(this)
  }
}
