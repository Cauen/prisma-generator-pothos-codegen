import { Comment } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const updateOneComment = builder.mutationFields((t) => ({
  updateOneComment: t.prismaField({
    type: Comment,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.CommentWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.CommentUpdateInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const found = await context.db.comment.update({
        where: args.where || undefined,
        data: args.data || undefined,
        ...query,
      })

      return found
    }
  })
}))