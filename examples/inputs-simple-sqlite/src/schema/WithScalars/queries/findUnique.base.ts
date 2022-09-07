import * as Inputs from '../../inputs';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueWithScalarsQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'WithScalars',
    nullable: true,
    args: { where: t.arg({ type: Inputs.WithScalarsWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.withScalars.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueWithScalarsQuery = defineQuery((t) => ({
  findUniqueWithScalars: t.prismaField(findUniqueWithScalarsQueryObject(t)),
}));
