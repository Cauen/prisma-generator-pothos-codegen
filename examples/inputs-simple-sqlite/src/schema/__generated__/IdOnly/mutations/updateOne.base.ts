import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneIdOnlyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'IdOnly',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.IdOnlyWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.IdOnlyUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.idOnly.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneIdOnlyMutation = defineMutation((t) => ({
  updateOneIdOnly: t.prismaField(updateOneIdOnlyMutationObject(t)),
}));
