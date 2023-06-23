import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneProfileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Profile',
    nullable: false,
    args: { data: t.arg({ type: Inputs.ProfileCreateInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await db.profile.create({ data: args.data, ...query }),
  }),
);

export const createOneProfileMutation = defineMutation((t) => ({
  createOneProfile: t.prismaField(createOneProfileMutationObject(t)),
}));
