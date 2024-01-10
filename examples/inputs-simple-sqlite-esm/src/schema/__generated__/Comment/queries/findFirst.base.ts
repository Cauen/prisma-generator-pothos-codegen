import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils.js';

export const findFirstCommentQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.CommentWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.CommentOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.CommentWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.CommentScalarFieldEnum], required: false }),
}))

export const findFirstCommentQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Comment',
    nullable: true,
    args: findFirstCommentQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.comment.findFirst({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      }),
  }),
);

export const findFirstCommentQuery = defineQuery((t) => ({
  findFirstComment: t.prismaField(findFirstCommentQueryObject(t)),
}));
