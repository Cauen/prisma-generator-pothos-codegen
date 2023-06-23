import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneWithScalarsMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'WithScalars',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.WithScalarsWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.WithScalarsCreateInput, required: true }),
      update: t.arg({ type: Inputs.WithScalarsUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await db.withScalars.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneWithScalarsMutation = defineMutation((t) => ({
  upsertOneWithScalars: t.prismaField(upsertOneWithScalarsMutationObject(t)),
}));
