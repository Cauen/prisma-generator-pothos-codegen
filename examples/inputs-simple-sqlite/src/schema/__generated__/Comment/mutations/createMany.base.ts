import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyCommentMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.CommentCreateInput], required: true }) }))

export const createManyCommentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Comment'],
    nullable: false,
    args: createManyCommentMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await db.$transaction(args.data.map((data) => db.comment.create({ data }))),
  }),
);

export const createManyCommentMutation = defineMutation((t) => ({
  createManyComment: t.prismaField(createManyCommentMutationObject(t)),
}));
