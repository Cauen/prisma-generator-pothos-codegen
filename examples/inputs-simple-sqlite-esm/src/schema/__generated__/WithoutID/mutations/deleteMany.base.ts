import * as Inputs from '../../inputs.js';
import { BatchPayload } from '../../objects.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils.js';

export const deleteManyWithoutIDMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.WithoutIDWhereInput, required: true }) }))

export const deleteManyWithoutIDMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyWithoutIDMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await _context.db.withoutID.deleteMany({ where: args.where }),
  }),
);

export const deleteManyWithoutIDMutation = defineMutation((t) => ({
  deleteManyWithoutID: t.field(deleteManyWithoutIDMutationObject(t)),
}));
