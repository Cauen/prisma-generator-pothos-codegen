import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstUnrelatedQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.UnrelatedWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.UnrelatedOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.UnrelatedWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.UnrelatedScalarFieldEnum], required: false }),
}))

export const findFirstUnrelatedQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Unrelated',
    nullable: true,
    args: findFirstUnrelatedQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.unrelated.findFirst({
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

export const findFirstUnrelatedQuery = defineQuery((t) => ({
  findFirstUnrelated: t.prismaField(findFirstUnrelatedQueryObject(t)),
}));
