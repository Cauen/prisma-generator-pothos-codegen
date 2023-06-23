import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneProfileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Profile',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.ProfileWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.ProfileCreateInput, required: true }),
      update: t.arg({ type: Inputs.ProfileUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await db.profile.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneProfileMutation = defineMutation((t) => ({
  upsertOneProfile: t.prismaField(upsertOneProfileMutationObject(t)),
}));
