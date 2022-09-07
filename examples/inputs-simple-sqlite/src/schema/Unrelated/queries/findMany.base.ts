import * as Inputs from '../../inputs';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyUnrelatedQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['Unrelated'],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.UnrelatedWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.UnrelatedOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.UnrelatedWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.UnrelatedScalarFieldEnum], required: false }),
    },
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
