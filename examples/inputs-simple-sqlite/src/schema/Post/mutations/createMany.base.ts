import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyPostMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Post'],
    nullable: false,
    args: { data: t.arg({ type: [Inputs.PostCreateInput], required: true }) },
    resolve: async (_query, _root, args, _context, _info) =>
      await _context.db.$transaction(args.data.map((data) => _context.db.post.create({ data }))),
  }),
);

export const createManyPostMutation = defineMutation((t) => ({
  createManyPost: t.prismaField(createManyPostMutationObject(t)),
}));
