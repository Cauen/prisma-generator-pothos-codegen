import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOnePostMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Post',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.PostWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.PostUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await db.post.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOnePostMutation = defineMutation((t) => ({
  updateOnePost: t.prismaField(updateOnePostMutationObject(t)),
}));
