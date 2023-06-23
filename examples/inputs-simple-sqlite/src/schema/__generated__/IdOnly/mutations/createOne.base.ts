import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneIdOnlyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'IdOnly',
    nullable: false,
    args: { data: t.arg({ type: Inputs.IdOnlyCreateInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await db.idOnly.create({ data: args.data, ...query }),
  }),
);

export const createOneIdOnlyMutation = defineMutation((t) => ({
  createOneIdOnly: t.prismaField(createOneIdOnlyMutationObject(t)),
}));
