import * as Inputs from '../inputs';
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const PostObject = definePrismaObject('Post', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', PostIdFieldObject),
    title: t.exposeString('title', PostTitleFieldObject),
    content: t.exposeString('content', PostContentFieldObject),
    Author: t.relation('Author', PostAuthorFieldObject),
    Comments: t.relation('Comments', PostCommentsFieldObject(t)),
    authorId: t.exposeInt('authorId', PostAuthorIdFieldObject),
  }),
});

export const PostIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
});

export const PostTitleFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
});

export const PostContentFieldObject = defineExposeObject('String', {
  description: 'createdAt description',
  nullable: false,
});

export const PostAuthorFieldObject = defineRelationObject('Post', 'Author', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const PostCommentsFieldObject = defineRelationFunction('Post', (t) =>
  defineRelationObject('Post', 'Comments', {
    description: undefined,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.CommentWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.CommentOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.CommentWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.CommentScalarFieldEnum], required: false }),
    },
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

export const PostAuthorIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
});
