import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneCommentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Comment',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.CommentWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.CommentCreateInput, required: true }),
      update: t.arg({ type: Inputs.CommentUpdateInput, required: true }),
    },
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
