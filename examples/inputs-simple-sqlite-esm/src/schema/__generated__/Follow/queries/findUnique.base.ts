import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils.js';

export const findUniqueFollowQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.FollowWhereUniqueInput, required: true }) }))

export const findUniqueFollowQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Follow',
    nullable: true,
    args: findUniqueFollowQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.follow.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueFollowQuery = defineQuery((t) => ({
  findUniqueFollow: t.prismaField(findUniqueFollowQueryObject(t)),
}));
