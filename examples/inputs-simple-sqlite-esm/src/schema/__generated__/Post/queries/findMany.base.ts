import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils.js';

export const findManyPostQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.PostWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.PostOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.PostWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.PostScalarFieldEnum], required: false }),
}))

export const findManyPostQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['Post'],
    nullable: false,
    args: findManyPostQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.post.findMany({
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

export const findManyPostQuery = defineQuery((t) => ({
  findManyPost: t.prismaField(findManyPostQueryObject(t)),
}));
