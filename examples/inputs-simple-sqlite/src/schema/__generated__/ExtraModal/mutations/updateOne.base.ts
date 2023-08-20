import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneExtraModalMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.ExtraModalWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.ExtraModalUpdateInput, required: true }),
    }))

export const updateOneExtraModalMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'ExtraModal',
    nullable: true,
    args: updateOneExtraModalMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.extraModal.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneExtraModalMutation = defineMutation((t) => ({
  updateOneExtraModal: t.prismaField(updateOneExtraModalMutationObject(t)),
}));
