import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueWithoutIDQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'WithoutID',
    nullable: true,
    args: { where: t.arg({ type: Inputs.WithoutIDWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await db.withoutID.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueWithoutIDQuery = defineQuery((t) => ({
  findUniqueWithoutID: t.prismaField(findUniqueWithoutIDQueryObject(t)),
}));
