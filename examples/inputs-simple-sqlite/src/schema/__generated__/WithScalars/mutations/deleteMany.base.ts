import * as Inputs from '@/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyWithScalarsMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.WithScalarsWhereInput, required: true }) }))

export const deleteManyWithScalarsMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyWithScalarsMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await db.withScalars.deleteMany({ where: args.where }),
  }),
);

export const deleteManyWithScalarsMutation = defineMutation((t) => ({
  deleteManyWithScalars: t.field(deleteManyWithScalarsMutationObject(t)),
}));
