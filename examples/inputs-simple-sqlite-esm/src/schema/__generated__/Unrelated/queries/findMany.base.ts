import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils.js';

export const findManyUnrelatedQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.UnrelatedWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.UnrelatedOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.UnrelatedWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.UnrelatedScalarFieldEnum], required: false }),
}))

export const findManyUnrelatedQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['Unrelated'],
    nullable: false,
    args: findManyUnrelatedQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.unrelated.findMany({
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

export const findManyUnrelatedQuery = defineQuery((t) => ({
  findManyUnrelated: t.prismaField(findManyUnrelatedQueryObject(t)),
}));
