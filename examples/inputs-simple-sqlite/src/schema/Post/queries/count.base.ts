import * as Inputs from '../../inputs';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countPostQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.PostWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.PostOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.PostWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.PostScalarFieldEnum], required: false }),
    },
    resolve: async (_root, args, _context, _info) =>
      await _context.db.post.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countPostQuery = defineQuery((t) => ({
  countPost: t.field(countPostQueryObject(t)),
}));
