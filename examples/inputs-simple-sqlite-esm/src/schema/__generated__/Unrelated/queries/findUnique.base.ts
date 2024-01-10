import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils.js';

export const findUniqueUnrelatedQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.UnrelatedWhereUniqueInput, required: true }) }))

export const findUniqueUnrelatedQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Unrelated',
    nullable: true,
    args: findUniqueUnrelatedQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.unrelated.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueUnrelatedQuery = defineQuery((t) => ({
  findUniqueUnrelated: t.prismaField(findUniqueUnrelatedQueryObject(t)),
}));
