import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueUnrelatedQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Unrelated',
    nullable: true,
    args: { where: t.arg({ type: Inputs.UnrelatedWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await db.unrelated.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueUnrelatedQuery = defineQuery((t) => ({
  findUniqueUnrelated: t.prismaField(findUniqueUnrelatedQueryObject(t)),
}));
