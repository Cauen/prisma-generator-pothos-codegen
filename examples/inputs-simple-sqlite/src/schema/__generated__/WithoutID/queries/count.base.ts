import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countWithoutIDQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.WithoutIDWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.WithoutIDOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.WithoutIDWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.WithoutIDScalarFieldEnum], required: false }),
}))

export const countWithoutIDQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countWithoutIDQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await db.withoutID.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countWithoutIDQuery = defineQuery((t) => ({
  countWithoutID: t.field(countWithoutIDQueryObject(t)),
}));
