import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const updateOnePostMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.PostWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.PostUpdateInput, required: true }),
    }))

export const updateOnePostMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Post',
    nullable: true,
    args: updateOnePostMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.post.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOnePostMutation = defineMutation((t) => ({
  updateOnePost: t.prismaField(updateOnePostMutationObject(t)),
}));
