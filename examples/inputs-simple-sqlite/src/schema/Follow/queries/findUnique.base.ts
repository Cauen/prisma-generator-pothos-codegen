import * as Inputs from '../../inputs';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueFollowQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Follow',
    nullable: true,
    args: { where: t.arg({ type: Inputs.FollowWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.follow.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueFollowQuery = defineQuery((t) => ({
  findUniqueFollow: t.prismaField(findUniqueFollowQueryObject(t)),
}));
