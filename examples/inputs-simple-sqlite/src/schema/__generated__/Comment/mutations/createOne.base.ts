import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneCommentMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.CommentCreateInput, required: true }) }))

export const createOneCommentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Comment',
    nullable: false,
    args: createOneCommentMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.comment.create({ data: args.data, ...query }),
  }),
);

export const createOneCommentMutation = defineMutation((t) => ({
  createOneComment: t.prismaField(createOneCommentMutationObject(t)),
}));
