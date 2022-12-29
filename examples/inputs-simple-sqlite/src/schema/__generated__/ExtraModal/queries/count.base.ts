import * as Inputs from '../../inputs';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countExtraModalQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.ExtraModalWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.ExtraModalOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.ExtraModalWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.ExtraModalScalarFieldEnum], required: false }),
    },
    resolve: async (_root, args, _context, _info) =>
      await _context.db.extraModal.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countExtraModalQuery = defineQuery((t) => ({
  countExtraModal: t.field(countExtraModalQueryObject(t)),
}));
