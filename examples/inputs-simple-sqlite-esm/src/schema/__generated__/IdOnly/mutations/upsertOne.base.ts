import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const upsertOneIdOnlyMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.IdOnlyWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.IdOnlyCreateInput, required: true }),
      update: t.field({ type: Inputs.IdOnlyUpdateInput, required: true }),
    }))

export const upsertOneIdOnlyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'IdOnly',
    nullable: false,
    args: upsertOneIdOnlyMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.idOnly.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneIdOnlyMutation = defineMutation((t) => ({
  upsertOneIdOnly: t.prismaField(upsertOneIdOnlyMutationObject(t)),
}));
