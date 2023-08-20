import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneUnrelatedMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.UnrelatedCreateInput, required: true }) }))

export const createOneUnrelatedMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Unrelated',
    nullable: false,
    args: createOneUnrelatedMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.unrelated.create({ data: args.data, ...query }),
  }),
);

export const createOneUnrelatedMutation = defineMutation((t) => ({
  createOneUnrelated: t.prismaField(createOneUnrelatedMutationObject(t)),
}));
