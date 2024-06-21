import * as Inputs from '@/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyUserLastMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.UserLastWhereInput, required: true }) }))

export const deleteManyUserLastMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyUserLastMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await db.userLast.deleteMany({ where: args.where }),
  }),
);

export const deleteManyUserLastMutation = defineMutation((t) => ({
  deleteManyUserLast: t.field(deleteManyUserLastMutationObject(t)),
}));
