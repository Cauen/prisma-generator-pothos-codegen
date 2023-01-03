export {
  CommentObject,
  CommentIdFieldObject,
  CommentCommentFieldObject,
  CommentAuthorFieldObject,
  CommentPostFieldObject,
  CommentAuthorIdFieldObject,
  CommentPostIdFieldObject
} from './object.base';
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
} from './mutations';
export {
  findFirstCommentQuery,
  findManyCommentQuery,
  countCommentQuery,
  findUniqueCommentQuery,
  findFirstCommentQueryObject,
  findManyCommentQueryObject,
  countCommentQueryObject,
  findUniqueCommentQueryObject
} from './queries';
