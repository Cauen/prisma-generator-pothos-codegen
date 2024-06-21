import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneUserLastMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.UserLastWhereUniqueInput, required: true }) }))

export const deleteOneUserLastMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'UserLast',
    nullable: true,
    args: deleteOneUserLastMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.userLast.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneUserLastMutation = defineMutation((t) => ({
  deleteOneUserLast: t.prismaField(deleteOneUserLastMutationObject(t)),
}));
