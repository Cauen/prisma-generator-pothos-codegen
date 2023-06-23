import * as Inputs from '@/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyWithoutIDMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.WithoutIDWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await db.withoutID.deleteMany({ where: args.where }),
  }),
);

export const deleteManyWithoutIDMutation = defineMutation((t) => ({
  deleteManyWithoutID: t.field(deleteManyWithoutIDMutationObject(t)),
}));
