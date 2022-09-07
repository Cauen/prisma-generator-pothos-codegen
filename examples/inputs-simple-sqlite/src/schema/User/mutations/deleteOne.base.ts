import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneUserMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'User',
    nullable: true,
    args: { where: t.arg({ type: Inputs.UserWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.user.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneUserMutation = defineMutation((t) => ({
  deleteOneUser: t.prismaField(deleteOneUserMutationObject(t)),
}));
