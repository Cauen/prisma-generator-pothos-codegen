import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const createOneIdOnlyMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.IdOnlyCreateInput, required: true }) }))

export const createOneIdOnlyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'IdOnly',
    nullable: false,
    args: createOneIdOnlyMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.idOnly.create({ data: args.data, ...query }),
  }),
);

export const createOneIdOnlyMutation = defineMutation((t) => ({
  createOneIdOnly: t.prismaField(createOneIdOnlyMutationObject(t)),
}));
