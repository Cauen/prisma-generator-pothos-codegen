import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const createOneProfileMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.ProfileCreateInput, required: true }) }))

export const createOneProfileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Profile',
    nullable: false,
    args: createOneProfileMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.profile.create({ data: args.data, ...query }),
  }),
);

export const createOneProfileMutation = defineMutation((t) => ({
  createOneProfile: t.prismaField(createOneProfileMutationObject(t)),
}));
