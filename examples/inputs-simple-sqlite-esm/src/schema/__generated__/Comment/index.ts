export {
  CommentObject,
  CommentIdFieldObject,
  CommentCommentFieldObject,
  CommentAuthorFieldObject,
  CommentPostFieldObject,
  CommentAuthorIdFieldObject,
  CommentPostIdFieldObject
} from './object.base.js';
export {
  createManyCommentMutation,
  createOneCommentMutation,
  deleteManyCommentMutation,
  deleteOneCommentMutation,
  updateManyCommentMutation,
  updateOneCommentMutation,
  upsertOneCommentMutation,
  createManyCommentMutationObject,
  createOneCommentMutationObject,
  deleteManyCommentMutationObject,
  deleteOneCommentMutationObject,
  updateManyCommentMutationObject,
  updateOneCommentMutationObject,
  upsertOneCommentMutationObject
} from './mutations/index.js';
export {
  findFirstCommentQuery,
  findManyCommentQuery,
  countCommentQuery,
  findUniqueCommentQuery,
  findFirstCommentQueryObject,
  findManyCommentQueryObject,
  countCommentQueryObject,
  findUniqueCommentQueryObject
} from './queries/index.js';
