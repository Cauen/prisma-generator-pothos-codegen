import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstProfileQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Profile',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.ProfileWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.ProfileOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.ProfileWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.ProfileScalarFieldEnum], required: false }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await db.profile.findFirst({
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

export const findFirstProfileQuery = defineQuery((t) => ({
  findFirstProfile: t.prismaField(findFirstProfileQueryObject(t)),
}));
