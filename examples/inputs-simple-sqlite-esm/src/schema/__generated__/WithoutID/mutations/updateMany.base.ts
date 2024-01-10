import * as Inputs from '../../inputs.js';
import { BatchPayload } from '../../objects.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils.js';

export const updateManyWithoutIDMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.WithoutIDWhereInput, required: false }),
      data: t.field({ type: Inputs.WithoutIDUpdateManyMutationInput, required: true }),
    }))

export const updateManyWithoutIDMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyWithoutIDMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await _context.db.withoutID.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyWithoutIDMutation = defineMutation((t) => ({
  updateManyWithoutID: t.field(updateManyWithoutIDMutationObject(t)),
}));
