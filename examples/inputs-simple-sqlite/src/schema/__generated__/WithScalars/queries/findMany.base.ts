import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyWithScalarsQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.WithScalarsWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.WithScalarsOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.WithScalarsWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.WithScalarsScalarFieldEnum], required: false }),
}))

export const findManyWithScalarsQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['WithScalars'],
    nullable: false,
    args: findManyWithScalarsQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.withScalars.findMany({
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

export const findManyWithScalarsQuery = defineQuery((t) => ({
  findManyWithScalars: t.prismaField(findManyWithScalarsQueryObject(t)),
}));
