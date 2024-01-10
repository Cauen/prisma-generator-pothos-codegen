import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const updateOneWithoutIDMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.WithoutIDWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.WithoutIDUpdateInput, required: true }),
    }))

export const updateOneWithoutIDMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'WithoutID',
    nullable: true,
    args: updateOneWithoutIDMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.withoutID.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneWithoutIDMutation = defineMutation((t) => ({
  updateOneWithoutID: t.prismaField(updateOneWithoutIDMutationObject(t)),
}));
