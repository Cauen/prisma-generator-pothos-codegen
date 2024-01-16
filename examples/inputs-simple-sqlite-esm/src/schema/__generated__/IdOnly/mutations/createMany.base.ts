import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const createManyIdOnlyMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.IdOnlyCreateInput], required: true }) }))

export const createManyIdOnlyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['IdOnly'],
    nullable: false,
    args: createManyIdOnlyMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await _context.db.$transaction(args.data.map((data) => _context.db.idOnly.create({ data }))),
  }),
);

export const createManyIdOnlyMutation = defineMutation((t) => ({
  createManyIdOnly: t.prismaField(createManyIdOnlyMutationObject(t)),
}));
