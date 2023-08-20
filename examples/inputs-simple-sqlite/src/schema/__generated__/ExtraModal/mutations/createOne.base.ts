import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneExtraModalMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.ExtraModalCreateInput, required: true }) }))

export const createOneExtraModalMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'ExtraModal',
    nullable: false,
    args: createOneExtraModalMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.extraModal.create({ data: args.data, ...query }),
  }),
);

export const createOneExtraModalMutation = defineMutation((t) => ({
  createOneExtraModal: t.prismaField(createOneExtraModalMutationObject(t)),
}));
