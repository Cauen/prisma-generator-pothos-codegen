import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneWithoutIDMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.WithoutIDWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.WithoutIDUpdateInput, required: true }),
    }))

export const updateOneWithoutIDMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'WithoutID',
    nullable: true,
    args: updateOneWithoutIDMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.withoutID.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneWithoutIDMutation = defineMutation((t) => ({
  updateOneWithoutID: t.prismaField(updateOneWithoutIDMutationObject(t)),
}));
