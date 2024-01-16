import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils.js';

export const countWithoutIDQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.WithoutIDWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.WithoutIDOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.WithoutIDWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.WithoutIDScalarFieldEnum], required: false }),
}))

export const countWithoutIDQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countWithoutIDQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await _context.db.withoutID.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countWithoutIDQuery = defineQuery((t) => ({
  countWithoutID: t.field(countWithoutIDQueryObject(t)),
}));
