import * as Inputs from '@/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyExtraModalMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.ExtraModalWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await db.extraModal.deleteMany({ where: args.where }),
  }),
);

export const deleteManyExtraModalMutation = defineMutation((t) => ({
  deleteManyExtraModal: t.field(deleteManyExtraModalMutationObject(t)),
}));
