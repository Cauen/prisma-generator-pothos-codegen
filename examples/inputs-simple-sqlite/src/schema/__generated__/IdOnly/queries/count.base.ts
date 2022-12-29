import * as Inputs from '../../inputs';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countIdOnlyQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.IdOnlyWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.IdOnlyOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.IdOnlyWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.IdOnlyScalarFieldEnum], required: false }),
    },
    resolve: async (_root, args, _context, _info) =>
      await _context.db.idOnly.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countIdOnlyQuery = defineQuery((t) => ({
  countIdOnly: t.field(countIdOnlyQueryObject(t)),
}));
