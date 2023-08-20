import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneWithoutIDMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.WithoutIDWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.WithoutIDCreateInput, required: true }),
      update: t.field({ type: Inputs.WithoutIDUpdateInput, required: true }),
    }))

export const upsertOneWithoutIDMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'WithoutID',
    nullable: false,
    args: upsertOneWithoutIDMutationArgs,
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
