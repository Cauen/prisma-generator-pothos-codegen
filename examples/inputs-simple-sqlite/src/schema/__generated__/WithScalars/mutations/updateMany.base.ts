import * as Inputs from '@/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyWithScalarsMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.WithScalarsWhereInput, required: false }),
      data: t.field({ type: Inputs.WithScalarsUpdateManyMutationInput, required: true }),
    }))

export const updateManyWithScalarsMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyWithScalarsMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await db.withScalars.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyWithScalarsMutation = defineMutation((t) => ({
  updateManyWithScalars: t.field(updateManyWithScalarsMutationObject(t)),
}));
