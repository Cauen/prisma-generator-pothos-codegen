export {
  UnrelatedObject,
  UnrelatedIdFieldObject,
  UnrelatedNameFieldObject
} from './object.base.js';
export {
  createManyUnrelatedMutation,
  createOneUnrelatedMutation,
  deleteManyUnrelatedMutation,
  deleteOneUnrelatedMutation,
  updateManyUnrelatedMutation,
  updateOneUnrelatedMutation,
  upsertOneUnrelatedMutation,
  createManyUnrelatedMutationObject,
  createOneUnrelatedMutationObject,
  deleteManyUnrelatedMutationObject,
  deleteOneUnrelatedMutationObject,
  updateManyUnrelatedMutationObject,
  updateOneUnrelatedMutationObject,
  upsertOneUnrelatedMutationObject
} from './mutations/index.js';
export {
  findFirstUnrelatedQuery,
  findManyUnrelatedQuery,
  countUnrelatedQuery,
  findUniqueUnrelatedQuery,
  findFirstUnrelatedQueryObject,
  findManyUnrelatedQueryObject,
  countUnrelatedQueryObject,
  findUniqueUnrelatedQueryObject
} from './queries/index.js';
