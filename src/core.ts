import { getModelForClass, ReturnModelType } from '@typegoose/typegoose'
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types'

export function getOptimisticModel<U extends AnyParamConstructor<any>, QueryHelpers>(
  cl: U,
): ReturnModelType<U, QueryHelpers> {
  return getModelForClass(cl, {
    schemaOptions: {
      timestamps: true,
      optimisticConcurrency: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    },
  })
}
