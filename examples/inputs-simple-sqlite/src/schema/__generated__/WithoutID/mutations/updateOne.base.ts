import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneWithoutIDMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'WithoutID',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.WithoutIDWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.WithoutIDUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.withoutID.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneWithoutIDMutation = defineMutation((t) => ({
  updateOneWithoutID: t.prismaField(updateOneWithoutIDMutationObject(t)),
}));
