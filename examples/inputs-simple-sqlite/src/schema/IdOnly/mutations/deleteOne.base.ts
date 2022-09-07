import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneIdOnlyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'IdOnly',
    nullable: true,
    args: { where: t.arg({ type: Inputs.IdOnlyWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.idOnly.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneIdOnlyMutation = defineMutation((t) => ({
  deleteOneIdOnly: t.prismaField(deleteOneIdOnlyMutationObject(t)),
}));
