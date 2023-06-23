import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueExtraModalQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'ExtraModal',
    nullable: true,
    args: { where: t.arg({ type: Inputs.ExtraModalWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await db.extraModal.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueExtraModalQuery = defineQuery((t) => ({
  findUniqueExtraModal: t.prismaField(findUniqueExtraModalQueryObject(t)),
}));
