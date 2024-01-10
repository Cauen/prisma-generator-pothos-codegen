import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const deleteOneProfileMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.ProfileWhereUniqueInput, required: true }) }))

export const deleteOneProfileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Profile',
    nullable: true,
    args: deleteOneProfileMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.profile.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneProfileMutation = defineMutation((t) => ({
  deleteOneProfile: t.prismaField(deleteOneProfileMutationObject(t)),
}));
