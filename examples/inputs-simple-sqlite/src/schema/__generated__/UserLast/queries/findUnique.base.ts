import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueUserLastQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.UserLastWhereUniqueInput, required: true }) }))

export const findUniqueUserLastQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'UserLast',
    nullable: true,
    args: findUniqueUserLastQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.userLast.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueUserLastQuery = defineQuery((t) => ({
  findUniqueUserLast: t.prismaField(findUniqueUserLastQueryObject(t)),
}));
