import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneUserLastMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.UserLastCreateInput, required: true }) }))

export const createOneUserLastMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'UserLast',
    nullable: false,
    args: createOneUserLastMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.userLast.create({ data: args.data, ...query }),
  }),
);

export const createOneUserLastMutation = defineMutation((t) => ({
  createOneUserLast: t.prismaField(createOneUserLastMutationObject(t)),
}));
