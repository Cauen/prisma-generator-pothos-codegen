import * as Inputs from '../../inputs';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueCommentQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Comment',
    nullable: true,
    args: { where: t.arg({ type: Inputs.CommentWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.comment.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueCommentQuery = defineQuery((t) => ({
  findUniqueComment: t.prismaField(findUniqueCommentQueryObject(t)),
}));
