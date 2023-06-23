import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueIdOnlyQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'IdOnly',
    nullable: true,
    args: { where: t.arg({ type: Inputs.IdOnlyWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await db.idOnly.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueIdOnlyQuery = defineQuery((t) => ({
  findUniqueIdOnly: t.prismaField(findUniqueIdOnlyQueryObject(t)),
}));
