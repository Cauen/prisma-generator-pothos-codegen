import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyExtraModalMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['ExtraModal'],
    nullable: false,
    args: { data: t.arg({ type: [Inputs.ExtraModalCreateInput], required: true }) },
    resolve: async (_query, _root, args, _context, _info) =>
      await db.$transaction(args.data.map((data) => db.extraModal.create({ data }))),
  }),
);

export const createManyExtraModalMutation = defineMutation((t) => ({
  createManyExtraModal: t.prismaField(createManyExtraModalMutationObject(t)),
}));
