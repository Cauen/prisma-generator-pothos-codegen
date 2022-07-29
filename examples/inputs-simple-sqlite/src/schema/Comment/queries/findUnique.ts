import { Comment } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const findUniqueComment = builder.queryFields((t) => ({
  findUniqueComment: t.prismaField({
    type: Comment,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.CommentWhereUniqueInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const found = await context.db.comment.findUnique({
        where: args.where,
        ...query,
      })

      return found
    }
  })
}))