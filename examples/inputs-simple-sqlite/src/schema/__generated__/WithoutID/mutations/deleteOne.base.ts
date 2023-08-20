import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneWithoutIDMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.WithoutIDWhereUniqueInput, required: true }) }))

export const deleteOneWithoutIDMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'WithoutID',
    nullable: true,
    args: deleteOneWithoutIDMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.withoutID.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneWithoutIDMutation = defineMutation((t) => ({
  deleteOneWithoutID: t.prismaField(deleteOneWithoutIDMutationObject(t)),
}));
