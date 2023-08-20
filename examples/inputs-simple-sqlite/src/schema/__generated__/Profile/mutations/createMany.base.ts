import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyProfileMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.ProfileCreateInput], required: true }) }))

export const createManyProfileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Profile'],
    nullable: false,
    args: createManyProfileMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await db.$transaction(args.data.map((data) => db.profile.create({ data }))),
  }),
);

export const createManyProfileMutation = defineMutation((t) => ({
  createManyProfile: t.prismaField(createManyProfileMutationObject(t)),
}));
