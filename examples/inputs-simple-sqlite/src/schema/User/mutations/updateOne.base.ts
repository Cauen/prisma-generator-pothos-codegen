import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneUserMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'User',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.UserWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.UserUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.user.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneUserMutation = defineMutation((t) => ({
  updateOneUser: t.prismaField(updateOneUserMutationObject(t)),
}));
