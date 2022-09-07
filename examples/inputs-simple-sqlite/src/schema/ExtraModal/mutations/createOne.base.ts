import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneExtraModalMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'ExtraModal',
    nullable: false,
    args: { data: t.arg({ type: Inputs.ExtraModalCreateInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.extraModal.create({ data: args.data, ...query }),
  }),
);

export const createOneExtraModalMutation = defineMutation((t) => ({
  createOneExtraModal: t.prismaField(createOneExtraModalMutationObject(t)),
}));
