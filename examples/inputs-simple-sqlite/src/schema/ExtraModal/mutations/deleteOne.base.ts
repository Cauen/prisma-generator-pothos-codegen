import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneExtraModalMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'ExtraModal',
    nullable: true,
    args: { where: t.arg({ type: Inputs.ExtraModalWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.extraModal.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneExtraModalMutation = defineMutation((t) => ({
  deleteOneExtraModal: t.prismaField(deleteOneExtraModalMutationObject(t)),
}));
