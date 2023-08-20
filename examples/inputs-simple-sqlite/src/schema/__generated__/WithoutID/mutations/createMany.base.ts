import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyWithoutIDMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.WithoutIDCreateInput], required: true }) }))

export const createManyWithoutIDMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['WithoutID'],
    nullable: false,
    args: createManyWithoutIDMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await db.$transaction(args.data.map((data) => db.withoutID.create({ data }))),
  }),
);

export const createManyWithoutIDMutation = defineMutation((t) => ({
  createManyWithoutID: t.prismaField(createManyWithoutIDMutationObject(t)),
}));
