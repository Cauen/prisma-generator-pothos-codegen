import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"
import { BatchPayload } from "@/schema/objects"

const deleteManyComment = builder.mutationFields((t) => ({
  deleteManyComment: t.field({
    type: BatchPayload,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.CommentWhereInput, required: true }),
    },
    resolve: async (root, args, context) => {
      const deletedBatch = await context.db.comment.deleteMany({
        where: args.where,
      })

      return deletedBatch
    }
  })
}))

export default deleteManyComment