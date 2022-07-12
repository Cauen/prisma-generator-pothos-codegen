import { Post } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const createManyPost = builder.mutationFields((t) => ({
  createManyPost: t.prismaField({
    type: [Post],
    nullable: false,
    args: {
      data: t.arg({ type: [Inputs.PostCreateInput], required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const list = await context.db.$transaction(
        args.data.map((data) => context.db.post.create({
          data: data,
        }))
      )

      return list
    }
  })
}))