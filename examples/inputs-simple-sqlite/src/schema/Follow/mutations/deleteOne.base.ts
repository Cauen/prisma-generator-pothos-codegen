import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneFollowMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Follow',
    nullable: true,
    args: { where: t.arg({ type: Inputs.FollowWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.follow.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneFollowMutation = defineMutation((t) => ({
  deleteOneFollow: t.prismaField(deleteOneFollowMutationObject(t)),
}));
