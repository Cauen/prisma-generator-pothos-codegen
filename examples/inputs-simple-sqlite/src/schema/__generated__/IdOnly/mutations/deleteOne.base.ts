import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneIdOnlyMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.IdOnlyWhereUniqueInput, required: true }) }))

export const deleteOneIdOnlyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'IdOnly',
    nullable: true,
    args: deleteOneIdOnlyMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.idOnly.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneIdOnlyMutation = defineMutation((t) => ({
  deleteOneIdOnly: t.prismaField(deleteOneIdOnlyMutationObject(t)),
}));
