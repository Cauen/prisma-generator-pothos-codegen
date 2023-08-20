import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyUnrelatedMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.UnrelatedCreateInput], required: true }) }))

export const createManyUnrelatedMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Unrelated'],
    nullable: false,
    args: createManyUnrelatedMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await db.$transaction(args.data.map((data) => db.unrelated.create({ data }))),
  }),
);

export const createManyUnrelatedMutation = defineMutation((t) => ({
  createManyUnrelated: t.prismaField(createManyUnrelatedMutationObject(t)),
}));
