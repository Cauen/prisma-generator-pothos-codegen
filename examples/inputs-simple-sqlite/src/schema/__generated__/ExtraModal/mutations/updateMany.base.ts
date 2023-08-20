import * as Inputs from '@/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyExtraModalMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.ExtraModalWhereInput, required: false }),
      data: t.field({ type: Inputs.ExtraModalUpdateManyMutationInput, required: true }),
    }))

export const updateManyExtraModalMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyExtraModalMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await db.extraModal.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyExtraModalMutation = defineMutation((t) => ({
  updateManyExtraModal: t.field(updateManyExtraModalMutationObject(t)),
}));
