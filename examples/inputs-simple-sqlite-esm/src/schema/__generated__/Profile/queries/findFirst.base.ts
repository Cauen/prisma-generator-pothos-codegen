import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils.js';

export const findFirstProfileQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.ProfileWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.ProfileOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.ProfileWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.ProfileScalarFieldEnum], required: false }),
}))

export const findFirstProfileQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Profile',
    nullable: true,
    args: findFirstProfileQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.profile.findFirst({
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
