import { Follow } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const findManyFollow = builder.queryFields((t) => ({
  findManyFollow: t.prismaField({
    type: [Follow],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.FollowWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.FollowOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.FollowWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.FollowScalarFieldEnum], required: false }),
    },
    resolve: async (query, root, args, context) => {
      const list = await context.db.follow.findMany({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      })

      return list
    }
  })
}))