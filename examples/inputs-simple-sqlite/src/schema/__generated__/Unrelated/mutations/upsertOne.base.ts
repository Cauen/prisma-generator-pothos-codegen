import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneUnrelatedMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Unrelated',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.UnrelatedWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.UnrelatedCreateInput, required: true }),
      update: t.arg({ type: Inputs.UnrelatedUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await db.unrelated.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneUnrelatedMutation = defineMutation((t) => ({
  upsertOneUnrelated: t.prismaField(upsertOneUnrelatedMutationObject(t)),
}));
