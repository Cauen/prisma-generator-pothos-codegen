import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const upsertOnePostMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.PostWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.PostCreateInput, required: true }),
      update: t.field({ type: Inputs.PostUpdateInput, required: true }),
    }))

export const upsertOnePostMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Post',
    nullable: false,
    args: upsertOnePostMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.post.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOnePostMutation = defineMutation((t) => ({
  upsertOnePost: t.prismaField(upsertOnePostMutationObject(t)),
}));
