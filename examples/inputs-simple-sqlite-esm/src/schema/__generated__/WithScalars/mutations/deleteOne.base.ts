import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const deleteOneWithScalarsMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.WithScalarsWhereUniqueInput, required: true }) }))

export const deleteOneWithScalarsMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'WithScalars',
    nullable: true,
    args: deleteOneWithScalarsMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.withScalars.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneWithScalarsMutation = defineMutation((t) => ({
  deleteOneWithScalars: t.prismaField(deleteOneWithScalarsMutationObject(t)),
}));
