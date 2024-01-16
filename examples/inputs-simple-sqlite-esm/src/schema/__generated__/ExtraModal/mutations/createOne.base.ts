import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const createOneExtraModalMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.ExtraModalCreateInput, required: true }) }))

export const createOneExtraModalMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'ExtraModal',
    nullable: false,
    args: createOneExtraModalMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.extraModal.create({ data: args.data, ...query }),
  }),
);

export const createOneExtraModalMutation = defineMutation((t) => ({
  createOneExtraModal: t.prismaField(createOneExtraModalMutationObject(t)),
}));
