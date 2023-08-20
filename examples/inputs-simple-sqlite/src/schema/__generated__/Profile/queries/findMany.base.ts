import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyProfileQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.ProfileWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.ProfileOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.ProfileWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.ProfileScalarFieldEnum], required: false }),
}))

export const findManyProfileQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['Profile'],
    nullable: false,
    args: findManyProfileQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.profile.findMany({
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

export const findManyProfileQuery = defineQuery((t) => ({
  findManyProfile: t.prismaField(findManyProfileQueryObject(t)),
}));
