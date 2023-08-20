import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueWithoutIDQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.WithoutIDWhereUniqueInput, required: true }) }))

export const findUniqueWithoutIDQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'WithoutID',
    nullable: true,
    args: findUniqueWithoutIDQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.withoutID.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueWithoutIDQuery = defineQuery((t) => ({
  findUniqueWithoutID: t.prismaField(findUniqueWithoutIDQueryObject(t)),
}));
