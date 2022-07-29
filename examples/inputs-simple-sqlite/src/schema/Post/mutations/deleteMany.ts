import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"
import { BatchPayload } from "@/schema/objects"

export const deleteManyPost = builder.mutationFields((t) => ({
  deleteManyPost: t.field({
    type: BatchPayload,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.PostWhereInput, required: true }),
    },
    resolve: async (root, args, context) => {
      const deletedBatch = await context.db.post.deleteMany({
        where: args.where,
      })

      return deletedBatch
    }
  })
}))