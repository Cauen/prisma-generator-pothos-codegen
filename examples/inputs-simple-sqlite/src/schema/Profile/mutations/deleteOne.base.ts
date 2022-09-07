import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneProfileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Profile',
    nullable: true,
    args: { where: t.arg({ type: Inputs.ProfileWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.profile.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneProfileMutation = defineMutation((t) => ({
  deleteOneProfile: t.prismaField(deleteOneProfileMutationObject(t)),
}));
