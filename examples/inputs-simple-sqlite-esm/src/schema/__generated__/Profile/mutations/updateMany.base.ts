import * as Inputs from '../../inputs.js';
import { BatchPayload } from '../../objects.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils.js';

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
      await _context.db.profile.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyProfileMutation = defineMutation((t) => ({
  updateManyProfile: t.field(updateManyProfileMutationObject(t)),
}));
