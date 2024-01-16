import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils.js';

export const findManyIdOnlyQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.IdOnlyWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.IdOnlyOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.IdOnlyWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.IdOnlyScalarFieldEnum], required: false }),
}))

export const findManyIdOnlyQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['IdOnly'],
    nullable: false,
    args: findManyIdOnlyQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.idOnly.findMany({
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

export const findManyIdOnlyQuery = defineQuery((t) => ({
  findManyIdOnly: t.prismaField(findManyIdOnlyQueryObject(t)),
}));
