import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOnePostMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Post',
    nullable: false,
    args: { data: t.arg({ type: Inputs.PostCreateInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await db.post.create({ data: args.data, ...query }),
  }),
);

export const createOnePostMutation = defineMutation((t) => ({
  createOnePost: t.prismaField(createOnePostMutationObject(t)),
}));
