import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countCommentQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.CommentWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.CommentOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.CommentWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.CommentScalarFieldEnum], required: false }),
}))

export const countCommentQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countCommentQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await db.comment.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countCommentQuery = defineQuery((t) => ({
  countComment: t.field(countCommentQueryObject(t)),
}));
