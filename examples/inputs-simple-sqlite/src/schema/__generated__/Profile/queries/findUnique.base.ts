import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueProfileQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Profile',
    nullable: true,
    args: { where: t.arg({ type: Inputs.ProfileWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await db.profile.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueProfileQuery = defineQuery((t) => ({
  findUniqueProfile: t.prismaField(findUniqueProfileQueryObject(t)),
}));
