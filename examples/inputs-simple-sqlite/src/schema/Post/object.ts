
// importing builder + inputs
import { builder } from "@/schema/builder";
import * as Inputs from "@/schema/inputs";

export const Post = builder.prismaObject('Post', {
  description: undefined, // defined inside schema as comment
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', { description: undefined, nullable: false, }),
    title: t.exposeString('title', { description: undefined, nullable: false, }),
    content: t.exposeString('content', { description: 'createdAt description', nullable: false, }),
    Author: t.relation('Author', {
      description: undefined,
      nullable: false,
      
    }),
    Comments: t.relation('Comments', {
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
      query: (args, context) => ({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      })
    }),
    authorId: t.exposeInt('authorId', { description: undefined, nullable: false, }),
  }),
});
