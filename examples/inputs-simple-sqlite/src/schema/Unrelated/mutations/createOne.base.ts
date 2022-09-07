import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneUnrelatedMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Unrelated',
    nullable: false,
    args: { data: t.arg({ type: Inputs.UnrelatedCreateInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.unrelated.create({ data: args.data, ...query }),
  }),
);

export const createOneUnrelatedMutation = defineMutation((t) => ({
  createOneUnrelated: t.prismaField(createOneUnrelatedMutationObject(t)),
}));
