import * as Inputs from '@/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

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
      await db.withoutID.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyWithoutIDMutation = defineMutation((t) => ({
  updateManyWithoutID: t.field(updateManyWithoutIDMutationObject(t)),
}));
