import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countProfileQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.ProfileWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.ProfileOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.ProfileWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.ProfileScalarFieldEnum], required: false }),
}))

export const countProfileQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countProfileQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await db.profile.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countProfileQuery = defineQuery((t) => ({
  countProfile: t.field(countProfileQueryObject(t)),
}));
