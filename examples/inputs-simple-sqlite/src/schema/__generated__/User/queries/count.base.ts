import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countUserQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.UserWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.UserOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.UserWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.UserScalarFieldEnum], required: false }),
}))

export const countUserQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countUserQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await db.user.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countUserQuery = defineQuery((t) => ({
  countUser: t.field(countUserQueryObject(t)),
}));
