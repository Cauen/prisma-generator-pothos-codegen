import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils.js';

export const findUniqueCommentQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.CommentWhereUniqueInput, required: true }) }))

export const findUniqueCommentQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Comment',
    nullable: true,
    args: findUniqueCommentQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.comment.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueCommentQuery = defineQuery((t) => ({
  findUniqueComment: t.prismaField(findUniqueCommentQueryObject(t)),
}));
