import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const createOneWithoutIDMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.WithoutIDCreateInput, required: true }) }))

export const createOneWithoutIDMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'WithoutID',
    nullable: false,
    args: createOneWithoutIDMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.withoutID.create({ data: args.data, ...query }),
  }),
);

export const createOneWithoutIDMutation = defineMutation((t) => ({
  createOneWithoutID: t.prismaField(createOneWithoutIDMutationObject(t)),
}));
