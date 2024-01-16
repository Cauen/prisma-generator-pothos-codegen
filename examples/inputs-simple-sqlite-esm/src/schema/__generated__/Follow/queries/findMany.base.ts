import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils.js';

export const findManyFollowQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.FollowWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.FollowOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.FollowWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.FollowScalarFieldEnum], required: false }),
}))

export const findManyFollowQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['Follow'],
    nullable: false,
    args: findManyFollowQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.follow.findMany({
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

export const findManyFollowQuery = defineQuery((t) => ({
  findManyFollow: t.prismaField(findManyFollowQueryObject(t)),
}));
