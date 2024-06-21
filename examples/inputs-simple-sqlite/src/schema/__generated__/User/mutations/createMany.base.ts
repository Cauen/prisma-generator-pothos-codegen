import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyUserMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.UserCreateInput], required: true }) }))

export const createManyUserMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['User'],
    nullable: false,
    args: createManyUserMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await db.$transaction(args.data.map((data) => db.user.create({ data }))),
  }),
);

export const createManyUserMutation = defineMutation((t) => ({
  createManyUser: t.prismaField(createManyUserMutationObject(t)),
}));
