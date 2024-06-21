import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstUserQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.UserWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.UserOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.UserWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.UserScalarFieldEnum], required: false }),
}))

export const findFirstUserQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'User',
    nullable: true,
    args: findFirstUserQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.user.findFirst({
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

export const findFirstUserQuery = defineQuery((t) => ({
  findFirstUser: t.prismaField(findFirstUserQueryObject(t)),
}));
