import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOnePostMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Post',
    nullable: true,
    args: { where: t.arg({ type: Inputs.PostWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.post.delete({ where: args.where, ...query }),
  }),
);

export const deleteOnePostMutation = defineMutation((t) => ({
  deleteOnePost: t.prismaField(deleteOnePostMutationObject(t)),
}));
