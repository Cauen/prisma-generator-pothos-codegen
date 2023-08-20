import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueCommentQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.CommentWhereUniqueInput, required: true }) }))

export const findUniqueCommentQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Comment',
    nullable: true,
    args: findUniqueCommentQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.comment.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueCommentQuery = defineQuery((t) => ({
  findUniqueComment: t.prismaField(findUniqueCommentQueryObject(t)),
}));
