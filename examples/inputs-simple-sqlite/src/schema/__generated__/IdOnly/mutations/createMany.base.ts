import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyIdOnlyMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.IdOnlyCreateInput], required: true }) }))

export const createManyIdOnlyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['IdOnly'],
    nullable: false,
    args: createManyIdOnlyMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await db.$transaction(args.data.map((data) => db.idOnly.create({ data }))),
  }),
);

export const createManyIdOnlyMutation = defineMutation((t) => ({
  createManyIdOnly: t.prismaField(createManyIdOnlyMutationObject(t)),
}));
