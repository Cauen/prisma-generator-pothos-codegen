import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const createOneWithScalarsMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.WithScalarsCreateInput, required: true }) }))

export const createOneWithScalarsMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'WithScalars',
    nullable: false,
    args: createOneWithScalarsMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.withScalars.create({ data: args.data, ...query }),
  }),
);

export const createOneWithScalarsMutation = defineMutation((t) => ({
  createOneWithScalars: t.prismaField(createOneWithScalarsMutationObject(t)),
}));
