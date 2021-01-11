export type EntityConverter<T, R> = (self: T) => R
export class EntitySchemaMapper {
  static from<T, R>(item: T, mapper: EntityConverter<T, R>): R | null {
    return mapper(item)
  }
}
