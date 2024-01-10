import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils.js';

export const findManyWithoutIDQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.WithoutIDWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.WithoutIDOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.WithoutIDWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.WithoutIDScalarFieldEnum], required: false }),
}))

export const findManyWithoutIDQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['WithoutID'],
    nullable: false,
    args: findManyWithoutIDQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.withoutID.findMany({
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

export const findManyWithoutIDQuery = defineQuery((t) => ({
  findManyWithoutID: t.prismaField(findManyWithoutIDQueryObject(t)),
}));
