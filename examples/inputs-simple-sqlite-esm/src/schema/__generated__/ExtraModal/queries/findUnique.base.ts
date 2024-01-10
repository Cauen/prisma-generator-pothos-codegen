import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils.js';

export const findUniqueExtraModalQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.ExtraModalWhereUniqueInput, required: true }) }))

export const findUniqueExtraModalQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'ExtraModal',
    nullable: true,
    args: findUniqueExtraModalQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.extraModal.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueExtraModalQuery = defineQuery((t) => ({
  findUniqueExtraModal: t.prismaField(findUniqueExtraModalQueryObject(t)),
}));
