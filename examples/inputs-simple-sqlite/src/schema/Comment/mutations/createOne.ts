import { Comment } from "@/schema/Comment"
import * as Inputs from '@/schema/inputs'
import { db } from "@/db"
import { builder } from "@/schema/builder"

const createOneComment = builder.mutationFields((t) => ({
  createOneComment: t.field({
    type: Comment,
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.CommentCreateInput, required: true }),
    },
    resolve: async (root, args, context, info) => {
      const user = await db.comment.create({
        data: args.data,
      })

      return user
    }
  })
}))

export default createOneComment