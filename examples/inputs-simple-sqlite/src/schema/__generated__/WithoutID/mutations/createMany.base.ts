import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyWithoutIDMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['WithoutID'],
    nullable: false,
    args: { data: t.arg({ type: [Inputs.WithoutIDCreateInput], required: true }) },
    resolve: async (_query, _root, args, _context, _info) =>
      await _context.db.$transaction(args.data.map((data) => _context.db.withoutID.create({ data }))),
  }),
);

export const createManyWithoutIDMutation = defineMutation((t) => ({
  createManyWithoutID: t.prismaField(createManyWithoutIDMutationObject(t)),
}));
