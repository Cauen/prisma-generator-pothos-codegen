import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueIdOnlyQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.IdOnlyWhereUniqueInput, required: true }) }))

export const findUniqueIdOnlyQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'IdOnly',
    nullable: true,
    args: findUniqueIdOnlyQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.idOnly.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueIdOnlyQuery = defineQuery((t) => ({
  findUniqueIdOnly: t.prismaField(findUniqueIdOnlyQueryObject(t)),
}));
