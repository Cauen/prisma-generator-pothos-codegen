import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneProfileMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.ProfileWhereUniqueInput, required: true }) }))

export const deleteOneProfileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Profile',
    nullable: true,
    args: deleteOneProfileMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.profile.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneProfileMutation = defineMutation((t) => ({
  deleteOneProfile: t.prismaField(deleteOneProfileMutationObject(t)),
}));
