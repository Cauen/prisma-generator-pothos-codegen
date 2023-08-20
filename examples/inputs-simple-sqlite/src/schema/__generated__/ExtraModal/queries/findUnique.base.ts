import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueExtraModalQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.ExtraModalWhereUniqueInput, required: true }) }))

export const findUniqueExtraModalQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'ExtraModal',
    nullable: true,
    args: findUniqueExtraModalQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.extraModal.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueExtraModalQuery = defineQuery((t) => ({
  findUniqueExtraModal: t.prismaField(findUniqueExtraModalQueryObject(t)),
}));
