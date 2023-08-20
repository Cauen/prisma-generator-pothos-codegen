import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneExtraModalMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.ExtraModalWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.ExtraModalCreateInput, required: true }),
      update: t.field({ type: Inputs.ExtraModalUpdateInput, required: true }),
    }))

export const upsertOneExtraModalMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'ExtraModal',
    nullable: false,
    args: upsertOneExtraModalMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.extraModal.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneExtraModalMutation = defineMutation((t) => ({
  upsertOneExtraModal: t.prismaField(upsertOneExtraModalMutationObject(t)),
}));
