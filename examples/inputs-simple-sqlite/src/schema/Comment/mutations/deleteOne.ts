import { Comment } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const deleteOneComment = builder.mutationFields((t) => ({
  deleteOneComment: t.prismaField({
    type: Comment,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.CommentWhereUniqueInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const deleted = await context.db.comment.delete({
        where: args.where,
        ...query,
      })

      return deleted
    }
  })
}))