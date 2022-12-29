import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneExtraModalMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'ExtraModal',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.ExtraModalWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.ExtraModalUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.extraModal.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneExtraModalMutation = defineMutation((t) => ({
  updateOneExtraModal: t.prismaField(updateOneExtraModalMutationObject(t)),
}));
