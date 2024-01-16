import * as Inputs from '../../inputs.js';
import { BatchPayload } from '../../objects.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils.js';

export const deleteManyIdOnlyMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.IdOnlyWhereInput, required: true }) }))

export const deleteManyIdOnlyMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyIdOnlyMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await _context.db.idOnly.deleteMany({ where: args.where }),
  }),
);

export const deleteManyIdOnlyMutation = defineMutation((t) => ({
  deleteManyIdOnly: t.field(deleteManyIdOnlyMutationObject(t)),
}));
