import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneExtraModalMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'ExtraModal',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.ExtraModalWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.ExtraModalCreateInput, required: true }),
      update: t.arg({ type: Inputs.ExtraModalUpdateInput, required: true }),
    },
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
