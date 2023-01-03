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
} from './object.base';
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
} from './mutations';
export {
  findFirstWithScalarsQuery,
  findManyWithScalarsQuery,
  countWithScalarsQuery,
  findUniqueWithScalarsQuery,
  findFirstWithScalarsQueryObject,
  findManyWithScalarsQueryObject,
  countWithScalarsQueryObject,
  findUniqueWithScalarsQueryObject
} from './queries';
