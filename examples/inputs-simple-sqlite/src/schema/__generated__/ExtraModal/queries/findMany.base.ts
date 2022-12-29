import * as Inputs from '../../inputs';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyExtraModalQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['ExtraModal'],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.ExtraModalWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.ExtraModalOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.ExtraModalWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.ExtraModalScalarFieldEnum], required: false }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.extraModal.findMany({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      }),
  }),
);

export const findManyExtraModalQuery = defineQuery((t) => ({
  findManyExtraModal: t.prismaField(findManyExtraModalQueryObject(t)),
}));
