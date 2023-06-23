import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneWithoutIDMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'WithoutID',
    nullable: true,
    args: { where: t.arg({ type: Inputs.WithoutIDWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await db.withoutID.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneWithoutIDMutation = defineMutation((t) => ({
  deleteOneWithoutID: t.prismaField(deleteOneWithoutIDMutationObject(t)),
}));
