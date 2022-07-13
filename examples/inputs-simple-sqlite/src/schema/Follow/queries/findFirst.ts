import { Follow } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const findFirstFollow = builder.queryFields((t) => ({
  findFirstFollow: t.prismaField({
    type: Follow,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.FollowWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.FollowOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.FollowWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.FollowScalarFieldEnum], required: false }),
    },
    resolve: async (query, root, args, context) => {
      const found = await context.db.follow.findFirst({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      })

      return found
    }
  })
}))

export default findFirstFollow