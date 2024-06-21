import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countUserLastQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.UserLastWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.UserLastOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.UserLastWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.UserLastScalarFieldEnum], required: false }),
}))

export const countUserLastQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countUserLastQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await db.userLast.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countUserLastQuery = defineQuery((t) => ({
  countUserLast: t.field(countUserLastQueryObject(t)),
}));
