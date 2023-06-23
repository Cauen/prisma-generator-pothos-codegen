import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyWithScalarsQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['WithScalars'],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.WithScalarsWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.WithScalarsOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.WithScalarsWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.WithScalarsScalarFieldEnum], required: false }),
    },
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
