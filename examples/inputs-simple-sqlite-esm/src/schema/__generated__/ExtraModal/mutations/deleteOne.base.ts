import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const deleteOneExtraModalMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.ExtraModalWhereUniqueInput, required: true }) }))

export const deleteOneExtraModalMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'ExtraModal',
    nullable: true,
    args: deleteOneExtraModalMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.extraModal.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneExtraModalMutation = defineMutation((t) => ({
  deleteOneExtraModal: t.prismaField(deleteOneExtraModalMutationObject(t)),
}));
