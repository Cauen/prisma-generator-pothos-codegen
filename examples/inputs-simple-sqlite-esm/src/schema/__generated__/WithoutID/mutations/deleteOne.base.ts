import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const deleteOneWithoutIDMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.WithoutIDWhereUniqueInput, required: true }) }))

export const deleteOneWithoutIDMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'WithoutID',
    nullable: true,
    args: deleteOneWithoutIDMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.withoutID.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneWithoutIDMutation = defineMutation((t) => ({
  deleteOneWithoutID: t.prismaField(deleteOneWithoutIDMutationObject(t)),
}));
