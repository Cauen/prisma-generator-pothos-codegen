import * as Inputs from '../inputs.js';
import { builder } from '../../builder.js';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils.js';

export const PostObject = definePrismaObject('Post', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(PostIdFieldObject),
    title: t.field(PostTitleFieldObject),
    content: t.field(PostContentFieldObject),
    Author: t.relation('Author', PostAuthorFieldObject),
    Comments: t.relation('Comments', PostCommentsFieldObject(t)),
    authorId: t.field(PostAuthorIdFieldObject),
  }),
});

export const PostIdFieldObject = defineFieldObject('Post', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const PostTitleFieldObject = defineFieldObject('Post', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.title,
});

export const PostContentFieldObject = defineFieldObject('Post', {
  type: "String",
  description: 'createdAt description',
  nullable: false,
  resolve: (parent) => parent.content,
});

export const PostAuthorFieldObject = defineRelationObject('Post', 'Author', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const PostCommentsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.CommentWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.CommentOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.CommentWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.CommentScalarFieldEnum], required: false }),
}))

export const PostCommentsFieldObject = defineRelationFunction('Post', (t) =>
  defineRelationObject('Post', 'Comments', {
    description: undefined,
    nullable: false,
    args: PostCommentsFieldArgs,
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);

export const PostAuthorIdFieldObject = defineFieldObject('Post', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.authorId,
});
