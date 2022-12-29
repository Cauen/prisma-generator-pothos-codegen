import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOnePostMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Post',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.PostWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.PostCreateInput, required: true }),
      update: t.arg({ type: Inputs.PostUpdateInput, required: true }),
    },
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
