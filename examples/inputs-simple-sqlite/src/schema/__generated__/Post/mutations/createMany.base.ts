import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyPostMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.PostCreateInput], required: true }) }))

export const createManyPostMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Post'],
    nullable: false,
    args: createManyPostMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await db.$transaction(args.data.map((data) => db.post.create({ data }))),
  }),
);

export const createManyPostMutation = defineMutation((t) => ({
  createManyPost: t.prismaField(createManyPostMutationObject(t)),
}));
