import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countProfileQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.ProfileWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.ProfileOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.ProfileWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.ProfileScalarFieldEnum], required: false }),
    },
    resolve: async (_root, args, _context, _info) =>
      await db.profile.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countProfileQuery = defineQuery((t) => ({
  countProfile: t.field(countProfileQueryObject(t)),
}));
