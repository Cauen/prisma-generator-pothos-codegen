import { Post } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const createOnePost = builder.mutationFields((t) => ({
  createOnePost: t.field({
    type: Post,
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.PostCreateInput, required: true }),
    },
    resolve: async (root, args, context, info) => {
      const created = await context.db.comment.create({
        data: args.data,
      })

      return created
    }
  })
}))

export default createOnePost