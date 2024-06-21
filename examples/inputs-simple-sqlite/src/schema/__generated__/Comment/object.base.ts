import * as Inputs from '@/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const CommentObject = definePrismaObject('Comment', {
  description: `This is a comment
This is a multiline comment
This is a \'single quote\' comment
This is a \"double quote\" comment
This is a \`backtick\` comment`,
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
  description: `This is a comment
This is a multiline comment
This is a \'single quote\' comment
This is a \"double quote\" comment
This is a \`backtick\` comment`,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const CommentCommentFieldObject = defineFieldObject('Comment', {
  type: "String",
  description: 'This is a \'single quote\' comment',
  nullable: false,
  resolve: (parent) => parent.comment,
});

export const CommentAuthorFieldObject = defineRelationObject('Comment', 'Author', {
  description: 'This is a \"double quote\" comment',
  nullable: false,
  args: undefined,
  query: undefined,
});

export const CommentPostFieldObject = defineRelationObject('Comment', 'Post', {
  description: 'This is a \`backtick\` comment',
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
