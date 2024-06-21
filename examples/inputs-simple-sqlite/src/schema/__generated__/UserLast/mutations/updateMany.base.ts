import * as Inputs from '@/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyUserLastMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.UserLastWhereInput, required: false }),
      data: t.field({ type: Inputs.UserLastUpdateManyMutationInput, required: true }),
    }))

export const updateManyUserLastMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyUserLastMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await db.userLast.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyUserLastMutation = defineMutation((t) => ({
  updateManyUserLast: t.field(updateManyUserLastMutationObject(t)),
}));
