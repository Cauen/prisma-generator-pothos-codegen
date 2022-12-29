import * as Inputs from '../../inputs';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueUnrelatedQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Unrelated',
    nullable: true,
    args: { where: t.arg({ type: Inputs.UnrelatedWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.unrelated.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueUnrelatedQuery = defineQuery((t) => ({
  findUniqueUnrelated: t.prismaField(findUniqueUnrelatedQueryObject(t)),
}));
