import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneUserLastMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.UserLastWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.UserLastCreateInput, required: true }),
      update: t.field({ type: Inputs.UserLastUpdateInput, required: true }),
    }))

export const upsertOneUserLastMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'UserLast',
    nullable: false,
    args: upsertOneUserLastMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.userLast.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneUserLastMutation = defineMutation((t) => ({
  upsertOneUserLast: t.prismaField(upsertOneUserLastMutationObject(t)),
}));
