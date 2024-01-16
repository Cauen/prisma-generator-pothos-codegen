import * as Inputs from '../../inputs.js';
import { BatchPayload } from '../../objects.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils.js';

export const deleteManyProfileMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.ProfileWhereInput, required: true }) }))

export const deleteManyProfileMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyProfileMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await _context.db.profile.deleteMany({ where: args.where }),
  }),
);

export const deleteManyProfileMutation = defineMutation((t) => ({
  deleteManyProfile: t.field(deleteManyProfileMutationObject(t)),
}));
