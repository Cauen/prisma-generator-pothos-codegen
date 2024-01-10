import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const createManyUnrelatedMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.UnrelatedCreateInput], required: true }) }))

export const createManyUnrelatedMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Unrelated'],
    nullable: false,
    args: createManyUnrelatedMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await _context.db.$transaction(args.data.map((data) => _context.db.unrelated.create({ data }))),
  }),
);

export const createManyUnrelatedMutation = defineMutation((t) => ({
  createManyUnrelated: t.prismaField(createManyUnrelatedMutationObject(t)),
}));
