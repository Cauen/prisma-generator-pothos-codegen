import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils.js';

export const countWithScalarsQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.WithScalarsWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.WithScalarsOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.WithScalarsWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.WithScalarsScalarFieldEnum], required: false }),
}))

export const countWithScalarsQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countWithScalarsQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await _context.db.withScalars.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countWithScalarsQuery = defineQuery((t) => ({
  countWithScalars: t.field(countWithScalarsQueryObject(t)),
}));
