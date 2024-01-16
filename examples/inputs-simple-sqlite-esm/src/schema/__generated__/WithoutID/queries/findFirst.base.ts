import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils.js';

export const findFirstWithoutIDQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.WithoutIDWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.WithoutIDOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.WithoutIDWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.WithoutIDScalarFieldEnum], required: false }),
}))

export const findFirstWithoutIDQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'WithoutID',
    nullable: true,
    args: findFirstWithoutIDQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.withoutID.findFirst({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      }),
  }),
);

export const findFirstWithoutIDQuery = defineQuery((t) => ({
  findFirstWithoutID: t.prismaField(findFirstWithoutIDQueryObject(t)),
}));
