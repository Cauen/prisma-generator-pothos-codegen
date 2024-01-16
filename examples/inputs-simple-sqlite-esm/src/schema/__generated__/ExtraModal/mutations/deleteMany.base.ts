import * as Inputs from '../../inputs.js';
import { BatchPayload } from '../../objects.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils.js';

export const deleteManyExtraModalMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.ExtraModalWhereInput, required: true }) }))

export const deleteManyExtraModalMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyExtraModalMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await _context.db.extraModal.deleteMany({ where: args.where }),
  }),
);

export const deleteManyExtraModalMutation = defineMutation((t) => ({
  deleteManyExtraModal: t.field(deleteManyExtraModalMutationObject(t)),
}));
