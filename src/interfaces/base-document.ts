export abstract class BaseDocument {
  readonly _id: any
  readonly updatedAt: Date
  readonly createdAt: Date
  /**
   * use countDocuments instead
   */
  static count: never
}
