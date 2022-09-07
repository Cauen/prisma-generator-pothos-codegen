import * as Inputs from '../../inputs';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countWithoutIDQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.WithoutIDWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.WithoutIDOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.WithoutIDWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.WithoutIDScalarFieldEnum], required: false }),
    },
    resolve: async (_root, args, _context, _info) =>
      await _context.db.withoutID.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countWithoutIDQuery = defineQuery((t) => ({
  countWithoutID: t.field(countWithoutIDQueryObject(t)),
}));
