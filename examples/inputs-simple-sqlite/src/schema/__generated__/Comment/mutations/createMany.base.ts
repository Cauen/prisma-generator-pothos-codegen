import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyCommentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Comment'],
    nullable: false,
    args: { data: t.arg({ type: [Inputs.CommentCreateInput], required: true }) },
    resolve: async (_query, _root, args, _context, _info) =>
      await db.$transaction(args.data.map((data) => db.comment.create({ data }))),
  }),
);

export const createManyCommentMutation = defineMutation((t) => ({
  createManyComment: t.prismaField(createManyCommentMutationObject(t)),
}));
