import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const createManyPostMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.PostCreateInput], required: true }) }))

export const createManyPostMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Post'],
    nullable: false,
    args: createManyPostMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await _context.db.$transaction(args.data.map((data) => _context.db.post.create({ data }))),
  }),
);

export const createManyPostMutation = defineMutation((t) => ({
  createManyPost: t.prismaField(createManyPostMutationObject(t)),
}));
