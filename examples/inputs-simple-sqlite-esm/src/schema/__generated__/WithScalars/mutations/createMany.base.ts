import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const createManyWithScalarsMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.WithScalarsCreateInput], required: true }) }))

export const createManyWithScalarsMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['WithScalars'],
    nullable: false,
    args: createManyWithScalarsMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await _context.db.$transaction(args.data.map((data) => _context.db.withScalars.create({ data }))),
  }),
);

export const createManyWithScalarsMutation = defineMutation((t) => ({
  createManyWithScalars: t.prismaField(createManyWithScalarsMutationObject(t)),
}));
