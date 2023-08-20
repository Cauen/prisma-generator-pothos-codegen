import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneExtraModalMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.ExtraModalWhereUniqueInput, required: true }) }))

export const deleteOneExtraModalMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'ExtraModal',
    nullable: true,
    args: deleteOneExtraModalMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.extraModal.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneExtraModalMutation = defineMutation((t) => ({
  deleteOneExtraModal: t.prismaField(deleteOneExtraModalMutationObject(t)),
}));
