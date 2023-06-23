import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyIdOnlyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['IdOnly'],
    nullable: false,
    args: { data: t.arg({ type: [Inputs.IdOnlyCreateInput], required: true }) },
    resolve: async (_query, _root, args, _context, _info) =>
      await db.$transaction(args.data.map((data) => db.idOnly.create({ data }))),
  }),
);

export const createManyIdOnlyMutation = defineMutation((t) => ({
  createManyIdOnly: t.prismaField(createManyIdOnlyMutationObject(t)),
}));
