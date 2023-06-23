import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countFollowQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.FollowWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.FollowOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.FollowWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.FollowScalarFieldEnum], required: false }),
    },
    resolve: async (_root, args, _context, _info) =>
      await db.follow.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countFollowQuery = defineQuery((t) => ({
  countFollow: t.field(countFollowQueryObject(t)),
}));
