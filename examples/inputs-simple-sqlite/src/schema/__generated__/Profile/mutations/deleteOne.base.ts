import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneProfileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Profile',
    nullable: true,
    args: { where: t.arg({ type: Inputs.ProfileWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await db.profile.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneProfileMutation = defineMutation((t) => ({
  deleteOneProfile: t.prismaField(deleteOneProfileMutationObject(t)),
}));
