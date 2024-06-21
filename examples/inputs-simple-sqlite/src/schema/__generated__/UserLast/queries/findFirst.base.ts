import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstUserLastQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.UserLastWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.UserLastOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.UserLastWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.UserLastScalarFieldEnum], required: false }),
}))

export const findFirstUserLastQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'UserLast',
    nullable: true,
    args: findFirstUserLastQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.userLast.findFirst({
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

export const findFirstUserLastQuery = defineQuery((t) => ({
  findFirstUserLast: t.prismaField(findFirstUserLastQueryObject(t)),
}));
