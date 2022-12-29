import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneWithoutIDMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'WithoutID',
    nullable: false,
    args: { data: t.arg({ type: Inputs.WithoutIDCreateInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.withoutID.create({ data: args.data, ...query }),
  }),
);

export const createOneWithoutIDMutation = defineMutation((t) => ({
  createOneWithoutID: t.prismaField(createOneWithoutIDMutationObject(t)),
}));
