import * as Inputs from '@/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const CommentObject = definePrismaObject('Comment', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', CommentIdFieldObject),
    comment: t.exposeString('comment', CommentCommentFieldObject),
    Author: t.relation('Author', CommentAuthorFieldObject),
    Post: t.relation('Post', CommentPostFieldObject),
    authorId: t.exposeInt('authorId', CommentAuthorIdFieldObject),
    postId: t.exposeInt('postId', CommentPostIdFieldObject),
  }),
});

export const CommentIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
});

export const CommentCommentFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
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

export const CommentAuthorIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
});

export const CommentPostIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
});
