import * as Inputs from '@/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyProfileMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.ProfileWhereInput, required: false }),
      data: t.field({ type: Inputs.ProfileUpdateManyMutationInput, required: true }),
    }))

export const updateManyProfileMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyProfileMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await db.profile.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyProfileMutation = defineMutation((t) => ({
  updateManyProfile: t.field(updateManyProfileMutationObject(t)),
}));
