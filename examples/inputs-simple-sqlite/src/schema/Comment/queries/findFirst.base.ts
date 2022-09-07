import * as Inputs from '../../inputs';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstCommentQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Comment',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.CommentWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.CommentOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.CommentWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.CommentScalarFieldEnum], required: false }),
    },
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
