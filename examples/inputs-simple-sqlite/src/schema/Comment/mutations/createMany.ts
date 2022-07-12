import { Comment } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const createManyComment = builder.mutationFields((t) => ({
  createManyComment: t.prismaField({
    type: [Comment],
    nullable: false,
    args: {
      data: t.arg({ type: [Inputs.CommentCreateInput], required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const list = await context.db.$transaction(
        args.data.map((data) => context.db.comment.create({
          data: data,
        }))
      )

      return list
    }
  })
}))