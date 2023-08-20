import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneWithScalarsMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.WithScalarsWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.WithScalarsCreateInput, required: true }),
      update: t.field({ type: Inputs.WithScalarsUpdateInput, required: true }),
    }))

export const upsertOneWithScalarsMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'WithScalars',
    nullable: false,
    args: upsertOneWithScalarsMutationArgs,
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
