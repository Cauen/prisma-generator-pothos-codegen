import * as Inputs from '@/schema/__generated__/inputs'
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const CommentObject = definePrismaObject('Comment', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(CommentIdFieldObject),
    comment: t.field(CommentCommentFieldObject),
    Author: t.relation('Author', CommentAuthorFieldObject),
    Post: t.relation('Post', CommentPostFieldObject),
    authorId: t.field(CommentAuthorIdFieldObject),
    postId: t.field(CommentPostIdFieldObject),
  }),
});

export const CommentIdFieldObject = defineFieldObject('Comment', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const CommentCommentFieldObject = defineFieldObject('Comment', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.comment,
});

export const CommentAuthorFieldObject = defineRelationObject('Comment', 'Author', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const CommentPostFieldObject = defineRelationObject('Comment', 'Post', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const CommentAuthorIdFieldObject = defineFieldObject('Comment', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.authorId,
});

export const CommentPostIdFieldObject = defineFieldObject('Comment', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.postId,
});
