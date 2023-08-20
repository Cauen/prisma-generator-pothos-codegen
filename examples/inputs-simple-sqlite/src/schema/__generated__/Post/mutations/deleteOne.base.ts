import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOnePostMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.PostWhereUniqueInput, required: true }) }))

export const deleteOnePostMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Post',
    nullable: true,
    args: deleteOnePostMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.post.delete({ where: args.where, ...query }),
  }),
);

export const deleteOnePostMutation = defineMutation((t) => ({
  deleteOnePost: t.prismaField(deleteOnePostMutationObject(t)),
}));
