import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyUnrelatedMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Unrelated'],
    nullable: false,
    args: { data: t.arg({ type: [Inputs.UnrelatedCreateInput], required: true }) },
    resolve: async (_query, _root, args, _context, _info) =>
      await _context.db.$transaction(args.data.map((data) => _context.db.unrelated.create({ data }))),
  }),
);

export const createManyUnrelatedMutation = defineMutation((t) => ({
  createManyUnrelated: t.prismaField(createManyUnrelatedMutationObject(t)),
}));
