import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstIdOnlyQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.IdOnlyWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.IdOnlyOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.IdOnlyWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.IdOnlyScalarFieldEnum], required: false }),
}))

export const findFirstIdOnlyQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'IdOnly',
    nullable: true,
    args: findFirstIdOnlyQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.idOnly.findFirst({
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

export const findFirstIdOnlyQuery = defineQuery((t) => ({
  findFirstIdOnly: t.prismaField(findFirstIdOnlyQueryObject(t)),
}));
