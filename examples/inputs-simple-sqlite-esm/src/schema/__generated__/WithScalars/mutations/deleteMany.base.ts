import * as Inputs from '../../inputs.js';
import { BatchPayload } from '../../objects.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils.js';

export const deleteManyWithScalarsMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.WithScalarsWhereInput, required: true }) }))

export const deleteManyWithScalarsMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyWithScalarsMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await _context.db.withScalars.deleteMany({ where: args.where }),
  }),
);

export const deleteManyWithScalarsMutation = defineMutation((t) => ({
  deleteManyWithScalars: t.field(deleteManyWithScalarsMutationObject(t)),
}));
