import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"
import { BatchPayload } from "@/schema/objects"

const updateManyComment = builder.mutationFields((t) => ({
  updateManyComment: t.field({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.CommentWhereInput, required: false }),
      data: t.arg({ type: Inputs.CommentUpdateManyMutationInput, required: true }),
    },
    resolve: async (root, args, context) => {
      const updatedBatch = await context.db.comment.updateMany({
        where: args.where || undefined,
        data: args.data,
      })

      return updatedBatch
    }
  })
}))

export default updateManyComment