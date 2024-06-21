import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyUserLastMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.UserLastCreateInput], required: true }) }))

export const createManyUserLastMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['UserLast'],
    nullable: false,
    args: createManyUserLastMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await db.$transaction(args.data.map((data) => db.userLast.create({ data }))),
  }),
);

export const createManyUserLastMutation = defineMutation((t) => ({
  createManyUserLast: t.prismaField(createManyUserLastMutationObject(t)),
}));
