import * as Inputs from '@/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyIdOnlyMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.IdOnlyWhereInput, required: false }),
      data: t.field({ type: Inputs.IdOnlyUpdateManyMutationInput, required: true }),
    }))

export const updateManyIdOnlyMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyIdOnlyMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await db.idOnly.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyIdOnlyMutation = defineMutation((t) => ({
  updateManyIdOnly: t.field(updateManyIdOnlyMutationObject(t)),
}));
