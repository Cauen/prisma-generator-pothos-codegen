import * as Inputs from '@/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyProfileMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.ProfileWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await db.profile.deleteMany({ where: args.where }),
  }),
);

export const deleteManyProfileMutation = defineMutation((t) => ({
  deleteManyProfile: t.field(deleteManyProfileMutationObject(t)),
}));
