import { Follow } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const findUniqueFollow = builder.queryFields((t) => ({
  findUniqueFollow: t.prismaField({
    type: Follow,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.FollowWhereUniqueInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const found = await context.db.follow.findUnique({
        where: args.where,
        ...query,
      })

      return found
    }
  })
}))

export default findUniqueFollow