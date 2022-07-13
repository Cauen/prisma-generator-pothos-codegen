import { Comment } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const createOneComment = builder.mutationFields((t) => ({
  createOneComment: t.field({
    type: Comment,
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.CommentCreateInput, required: true }),
    },
    resolve: async (root, args, context, info) => {
      const created = await context.db.comment.create({
        data: args.data,
      })

      return created
    }
  })
}))

export default createOneComment