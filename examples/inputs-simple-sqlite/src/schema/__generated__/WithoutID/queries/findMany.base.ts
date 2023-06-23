import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyWithoutIDQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['WithoutID'],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.WithoutIDWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.WithoutIDOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.WithoutIDWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.WithoutIDScalarFieldEnum], required: false }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await db.withoutID.findMany({
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
