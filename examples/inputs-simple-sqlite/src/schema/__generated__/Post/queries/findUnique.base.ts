import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniquePostQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.PostWhereUniqueInput, required: true }) }))

export const findUniquePostQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Post',
    nullable: true,
    args: findUniquePostQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.post.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniquePostQuery = defineQuery((t) => ({
  findUniquePost: t.prismaField(findUniquePostQueryObject(t)),
}));
