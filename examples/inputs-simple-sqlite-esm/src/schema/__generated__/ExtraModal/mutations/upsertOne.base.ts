import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

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
      await _context.db.extraModal.upsert({
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
