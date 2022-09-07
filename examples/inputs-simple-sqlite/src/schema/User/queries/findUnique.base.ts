import * as Inputs from '../../inputs';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueUserQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'User',
    nullable: true,
    args: { where: t.arg({ type: Inputs.UserWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.user.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueUserQuery = defineQuery((t) => ({
  findUniqueUser: t.prismaField(findUniqueUserQueryObject(t)),
}));
