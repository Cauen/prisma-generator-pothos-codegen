import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneUserLastMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.UserLastWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.UserLastUpdateInput, required: true }),
    }))

export const updateOneUserLastMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'UserLast',
    nullable: true,
    args: updateOneUserLastMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.userLast.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneUserLastMutation = defineMutation((t) => ({
  updateOneUserLast: t.prismaField(updateOneUserLastMutationObject(t)),
}));
