import * as Inputs from '@/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyIdOnlyMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.IdOnlyWhereInput, required: true }) }))

export const deleteManyIdOnlyMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyIdOnlyMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await db.idOnly.deleteMany({ where: args.where }),
  }),
);

export const deleteManyIdOnlyMutation = defineMutation((t) => ({
  deleteManyIdOnly: t.field(deleteManyIdOnlyMutationObject(t)),
}));
