import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneWithScalarsMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'WithScalars',
    nullable: true,
    args: { where: t.arg({ type: Inputs.WithScalarsWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.withScalars.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneWithScalarsMutation = defineMutation((t) => ({
  deleteOneWithScalars: t.prismaField(deleteOneWithScalarsMutationObject(t)),
}));
