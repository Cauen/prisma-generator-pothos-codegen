import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const upsertOneUnrelatedMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.UnrelatedWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.UnrelatedCreateInput, required: true }),
      update: t.field({ type: Inputs.UnrelatedUpdateInput, required: true }),
    }))

export const upsertOneUnrelatedMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Unrelated',
    nullable: false,
    args: upsertOneUnrelatedMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.unrelated.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneUnrelatedMutation = defineMutation((t) => ({
  upsertOneUnrelated: t.prismaField(upsertOneUnrelatedMutationObject(t)),
}));
