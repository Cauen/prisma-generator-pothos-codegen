import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const updateOneWithScalarsMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.WithScalarsWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.WithScalarsUpdateInput, required: true }),
    }))

export const updateOneWithScalarsMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'WithScalars',
    nullable: true,
    args: updateOneWithScalarsMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.withScalars.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneWithScalarsMutation = defineMutation((t) => ({
  updateOneWithScalars: t.prismaField(updateOneWithScalarsMutationObject(t)),
}));
