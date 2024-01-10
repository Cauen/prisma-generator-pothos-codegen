export {
  WithScalarsObject,
  WithScalarsIdFieldObject,
  WithScalarsStringFieldObject,
  WithScalarsBooleanFieldObject,
  WithScalarsIntFieldObject,
  WithScalarsFloatFieldObject,
  WithScalarsDecimalFieldObject,
  WithScalarsBigintFieldObject,
  WithScalarsDatetimeFieldObject,
  WithScalarsBytesFieldObject
} from './object.base.js';
export {
  createManyWithScalarsMutation,
  createOneWithScalarsMutation,
  deleteManyWithScalarsMutation,
  deleteOneWithScalarsMutation,
  updateManyWithScalarsMutation,
  updateOneWithScalarsMutation,
  upsertOneWithScalarsMutation,
  createManyWithScalarsMutationObject,
  createOneWithScalarsMutationObject,
  deleteManyWithScalarsMutationObject,
  deleteOneWithScalarsMutationObject,
  updateManyWithScalarsMutationObject,
  updateOneWithScalarsMutationObject,
  upsertOneWithScalarsMutationObject
} from './mutations/index.js';
export {
  findFirstWithScalarsQuery,
  findManyWithScalarsQuery,
  countWithScalarsQuery,
  findUniqueWithScalarsQuery,
  findFirstWithScalarsQueryObject,
  findManyWithScalarsQueryObject,
  countWithScalarsQueryObject,
  findUniqueWithScalarsQueryObject
} from './queries/index.js';
