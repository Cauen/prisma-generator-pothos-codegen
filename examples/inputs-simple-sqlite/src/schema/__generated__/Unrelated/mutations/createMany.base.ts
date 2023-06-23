import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyUnrelatedMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Unrelated'],
    nullable: false,
    args: { data: t.arg({ type: [Inputs.UnrelatedCreateInput], required: true }) },
    resolve: async (_query, _root, args, _context, _info) =>
      await db.$transaction(args.data.map((data) => db.unrelated.create({ data }))),
  }),
);

export const createManyUnrelatedMutation = defineMutation((t) => ({
  createManyUnrelated: t.prismaField(createManyUnrelatedMutationObject(t)),
}));
