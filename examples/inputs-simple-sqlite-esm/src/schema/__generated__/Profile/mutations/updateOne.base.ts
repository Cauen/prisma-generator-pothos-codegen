import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const updateOneProfileMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.ProfileWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.ProfileUpdateInput, required: true }),
    }))

export const updateOneProfileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Profile',
    nullable: true,
    args: updateOneProfileMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.profile.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneProfileMutation = defineMutation((t) => ({
  updateOneProfile: t.prismaField(updateOneProfileMutationObject(t)),
}));
