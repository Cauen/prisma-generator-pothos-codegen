import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const createManyExtraModalMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.ExtraModalCreateInput], required: true }) }))

export const createManyExtraModalMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['ExtraModal'],
    nullable: false,
    args: createManyExtraModalMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await _context.db.$transaction(args.data.map((data) => _context.db.extraModal.create({ data }))),
  }),
);

export const createManyExtraModalMutation = defineMutation((t) => ({
  createManyExtraModal: t.prismaField(createManyExtraModalMutationObject(t)),
}));
