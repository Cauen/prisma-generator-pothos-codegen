import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneUserMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.UserCreateInput, required: true }) }))

export const createOneUserMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'User',
    nullable: false,
    args: createOneUserMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.user.create({ data: args.data, ...query }),
  }),
);

export const createOneUserMutation = defineMutation((t) => ({
  createOneUser: t.prismaField(createOneUserMutationObject(t)),
}));
