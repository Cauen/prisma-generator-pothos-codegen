import { Comment } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const upsertOneComment = builder.mutationFields((t) => ({
  upsertOneComment: t.prismaField({
    type: Comment,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.CommentWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.CommentCreateInput, required: true }),
      update: t.arg({ type: Inputs.CommentUpdateInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const upserted = await context.db.comment.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      })

      return upserted
    }
  })
}))