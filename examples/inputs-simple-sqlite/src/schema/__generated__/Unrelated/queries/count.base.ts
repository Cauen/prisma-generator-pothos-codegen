import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countUnrelatedQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.UnrelatedWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.UnrelatedOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.UnrelatedWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.UnrelatedScalarFieldEnum], required: false }),
}))

export const countUnrelatedQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countUnrelatedQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await db.unrelated.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countUnrelatedQuery = defineQuery((t) => ({
  countUnrelated: t.field(countUnrelatedQueryObject(t)),
}));
