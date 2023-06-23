import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneWithoutIDMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'WithoutID',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.WithoutIDWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.WithoutIDCreateInput, required: true }),
      update: t.arg({ type: Inputs.WithoutIDUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await db.withoutID.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneWithoutIDMutation = defineMutation((t) => ({
  upsertOneWithoutID: t.prismaField(upsertOneWithoutIDMutationObject(t)),
}));
