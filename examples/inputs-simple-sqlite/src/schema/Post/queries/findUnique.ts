import { Post } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const findUniquePost = builder.queryFields((t) => ({
  findUniquePost: t.prismaField({
    type: Post,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.PostWhereUniqueInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const found = await context.db.post.findUnique({
        where: args.where,
        ...query,
      })

      return found
    }
  })
}))