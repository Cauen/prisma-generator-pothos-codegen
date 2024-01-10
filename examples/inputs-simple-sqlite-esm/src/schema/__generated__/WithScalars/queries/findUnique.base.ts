import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils.js';

export const findUniqueWithScalarsQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.WithScalarsWhereUniqueInput, required: true }) }))

export const findUniqueWithScalarsQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'WithScalars',
    nullable: true,
    args: findUniqueWithScalarsQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.withScalars.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueWithScalarsQuery = defineQuery((t) => ({
  findUniqueWithScalars: t.prismaField(findUniqueWithScalarsQueryObject(t)),
}));
