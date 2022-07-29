import { Post } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const createOnePost = builder.mutationFields((t) => ({
  createOnePost: t.prismaField({
    type: Post,
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.PostCreateInput, required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const created = await context.db.post.create({
        data: args.data,
        ...query,
      })

      return created
    }
  })
}))