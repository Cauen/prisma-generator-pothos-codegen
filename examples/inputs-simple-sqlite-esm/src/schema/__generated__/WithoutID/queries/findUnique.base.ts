import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils.js';

export const findUniqueWithoutIDQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.WithoutIDWhereUniqueInput, required: true }) }))

export const findUniqueWithoutIDQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'WithoutID',
    nullable: true,
    args: findUniqueWithoutIDQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.withoutID.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueWithoutIDQuery = defineQuery((t) => ({
  findUniqueWithoutID: t.prismaField(findUniqueWithoutIDQueryObject(t)),
}));
