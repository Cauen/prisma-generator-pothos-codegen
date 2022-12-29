import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneIdOnlyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'IdOnly',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.IdOnlyWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.IdOnlyCreateInput, required: true }),
      update: t.arg({ type: Inputs.IdOnlyUpdateInput, required: true }),
    },
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
