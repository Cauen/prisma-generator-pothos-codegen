import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils.js';

export const findUniqueIdOnlyQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.IdOnlyWhereUniqueInput, required: true }) }))

export const findUniqueIdOnlyQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'IdOnly',
    nullable: true,
    args: findUniqueIdOnlyQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.idOnly.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueIdOnlyQuery = defineQuery((t) => ({
  findUniqueIdOnly: t.prismaField(findUniqueIdOnlyQueryObject(t)),
}));
