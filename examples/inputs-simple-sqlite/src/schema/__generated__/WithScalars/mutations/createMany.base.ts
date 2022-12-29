import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyWithScalarsMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['WithScalars'],
    nullable: false,
    args: { data: t.arg({ type: [Inputs.WithScalarsCreateInput], required: true }) },
    resolve: async (_query, _root, args, _context, _info) =>
      await _context.db.$transaction(args.data.map((data) => _context.db.withScalars.create({ data }))),
  }),
);

export const createManyWithScalarsMutation = defineMutation((t) => ({
  createManyWithScalars: t.prismaField(createManyWithScalarsMutationObject(t)),
}));
