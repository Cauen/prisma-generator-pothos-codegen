import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyExtraModalMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.ExtraModalCreateInput], required: true }) }))

export const createManyExtraModalMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['ExtraModal'],
    nullable: false,
    args: createManyExtraModalMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await db.$transaction(args.data.map((data) => db.extraModal.create({ data }))),
  }),
);

export const createManyExtraModalMutation = defineMutation((t) => ({
  createManyExtraModal: t.prismaField(createManyExtraModalMutationObject(t)),
}));
