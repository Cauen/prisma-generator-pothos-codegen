import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyExtraModalQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.ExtraModalWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.ExtraModalOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.ExtraModalWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.ExtraModalScalarFieldEnum], required: false }),
}))

export const findManyExtraModalQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['ExtraModal'],
    nullable: false,
    args: findManyExtraModalQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.extraModal.findMany({
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

export const findManyExtraModalQuery = defineQuery((t) => ({
  findManyExtraModal: t.prismaField(findManyExtraModalQueryObject(t)),
}));
