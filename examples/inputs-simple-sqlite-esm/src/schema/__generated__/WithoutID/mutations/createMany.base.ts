import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const createManyWithoutIDMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.WithoutIDCreateInput], required: true }) }))

export const createManyWithoutIDMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['WithoutID'],
    nullable: false,
    args: createManyWithoutIDMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await _context.db.$transaction(args.data.map((data) => _context.db.withoutID.create({ data }))),
  }),
);

export const createManyWithoutIDMutation = defineMutation((t) => ({
  createManyWithoutID: t.prismaField(createManyWithoutIDMutationObject(t)),
}));
