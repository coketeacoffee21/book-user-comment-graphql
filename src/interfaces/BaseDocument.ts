import { Types } from 'mongoose'

export abstract class BaseDocument {
  readonly _id: Types.ObjectId
  readonly updatedAt: Date
  readonly createdAt: Date
  /**
   * use countDocuments instead
   */
  static count: never
}
