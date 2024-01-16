import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils.js';

export const countIdOnlyQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.IdOnlyWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.IdOnlyOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.IdOnlyWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.IdOnlyScalarFieldEnum], required: false }),
}))

export const countIdOnlyQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countIdOnlyQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await _context.db.idOnly.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countIdOnlyQuery = defineQuery((t) => ({
  countIdOnly: t.field(countIdOnlyQueryObject(t)),
}));
