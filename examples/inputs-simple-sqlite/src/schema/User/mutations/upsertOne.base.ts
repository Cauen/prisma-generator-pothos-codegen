import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneUserMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'User',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.UserWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.UserCreateInput, required: true }),
      update: t.arg({ type: Inputs.UserUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.user.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneUserMutation = defineMutation((t) => ({
  upsertOneUser: t.prismaField(upsertOneUserMutationObject(t)),
}));
