import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneProfileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Profile',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.ProfileWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.ProfileUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.profile.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneProfileMutation = defineMutation((t) => ({
  updateOneProfile: t.prismaField(updateOneProfileMutationObject(t)),
}));
