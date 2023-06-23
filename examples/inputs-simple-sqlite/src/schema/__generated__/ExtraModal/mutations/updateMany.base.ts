import * as Inputs from '@/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyExtraModalMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.ExtraModalWhereInput, required: false }),
      data: t.arg({ type: Inputs.ExtraModalUpdateManyMutationInput, required: true }),
    },
    resolve: async (_root, args, _context, _info) =>
      await db.extraModal.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyExtraModalMutation = defineMutation((t) => ({
  updateManyExtraModal: t.field(updateManyExtraModalMutationObject(t)),
}));
