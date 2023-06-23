import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniquePostQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Post',
    nullable: true,
    args: { where: t.arg({ type: Inputs.PostWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await db.post.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniquePostQuery = defineQuery((t) => ({
  findUniquePost: t.prismaField(findUniquePostQueryObject(t)),
}));
