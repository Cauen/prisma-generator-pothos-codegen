import * as Inputs from '../../inputs';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstFollowQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Follow',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.FollowWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.FollowOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.FollowWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.FollowScalarFieldEnum], required: false }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.follow.findFirst({
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

export const findFirstFollowQuery = defineQuery((t) => ({
  findFirstFollow: t.prismaField(findFirstFollowQueryObject(t)),
}));
