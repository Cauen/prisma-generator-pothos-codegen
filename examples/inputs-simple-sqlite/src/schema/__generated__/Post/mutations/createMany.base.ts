import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyPostMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Post'],
    nullable: false,
    args: { data: t.arg({ type: [Inputs.PostCreateInput], required: true }) },
    resolve: async (_query, _root, args, _context, _info) =>
      await db.$transaction(args.data.map((data) => db.post.create({ data }))),
  }),
);

export const createManyPostMutation = defineMutation((t) => ({
  createManyPost: t.prismaField(createManyPostMutationObject(t)),
}));
