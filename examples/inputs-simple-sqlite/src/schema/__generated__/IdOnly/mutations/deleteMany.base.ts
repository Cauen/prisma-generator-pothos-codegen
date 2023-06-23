import * as Inputs from '@/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyIdOnlyMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.IdOnlyWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await db.idOnly.deleteMany({ where: args.where }),
  }),
);

export const deleteManyIdOnlyMutation = defineMutation((t) => ({
  deleteManyIdOnly: t.field(deleteManyIdOnlyMutationObject(t)),
}));
