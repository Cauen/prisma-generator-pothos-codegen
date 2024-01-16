import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const upsertOneCommentMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.CommentWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.CommentCreateInput, required: true }),
      update: t.field({ type: Inputs.CommentUpdateInput, required: true }),
    }))

export const upsertOneCommentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Comment',
    nullable: false,
    args: upsertOneCommentMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.comment.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneCommentMutation = defineMutation((t) => ({
  upsertOneComment: t.prismaField(upsertOneCommentMutationObject(t)),
}));
