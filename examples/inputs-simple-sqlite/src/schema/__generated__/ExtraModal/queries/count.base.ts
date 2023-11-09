import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countExtraModalQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.ExtraModalWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.ExtraModalOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.ExtraModalWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.ExtraModalScalarFieldEnum], required: false }),
}))

export const countExtraModalQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countExtraModalQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await db.extraModal.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countExtraModalQuery = defineQuery((t) => ({
  countExtraModal: t.field(countExtraModalQueryObject(t)),
}));
