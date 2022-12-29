import * as Inputs from '../../inputs';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueWithoutIDQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'WithoutID',
    nullable: true,
    args: { where: t.arg({ type: Inputs.WithoutIDWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.withoutID.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueWithoutIDQuery = defineQuery((t) => ({
  findUniqueWithoutID: t.prismaField(findUniqueWithoutIDQueryObject(t)),
}));
