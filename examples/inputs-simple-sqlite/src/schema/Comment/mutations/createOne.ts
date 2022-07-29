import { Comment } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const createOneComment = builder.mutationFields((t) => ({
  createOneComment: t.prismaField({
    type: Comment,
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.CommentCreateInput, required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const created = await context.db.comment.create({
        data: args.data,
        ...query,
      })

      return created
    }
  })
}))