import * as Inputs from '../../inputs';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueExtraModalQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'ExtraModal',
    nullable: true,
    args: { where: t.arg({ type: Inputs.ExtraModalWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.extraModal.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueExtraModalQuery = defineQuery((t) => ({
  findUniqueExtraModal: t.prismaField(findUniqueExtraModalQueryObject(t)),
}));
