import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyIdOnlyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['IdOnly'],
    nullable: false,
    args: { data: t.arg({ type: [Inputs.IdOnlyCreateInput], required: true }) },
    resolve: async (_query, _root, args, _context, _info) =>
      await _context.db.$transaction(args.data.map((data) => _context.db.idOnly.create({ data }))),
  }),
);

export const createManyIdOnlyMutation = defineMutation((t) => ({
  createManyIdOnly: t.prismaField(createManyIdOnlyMutationObject(t)),
}));
