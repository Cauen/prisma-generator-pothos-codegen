import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const createManyProfileMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.ProfileCreateInput], required: true }) }))

export const createManyProfileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Profile'],
    nullable: false,
    args: createManyProfileMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await _context.db.$transaction(args.data.map((data) => _context.db.profile.create({ data }))),
  }),
);

export const createManyProfileMutation = defineMutation((t) => ({
  createManyProfile: t.prismaField(createManyProfileMutationObject(t)),
}));
