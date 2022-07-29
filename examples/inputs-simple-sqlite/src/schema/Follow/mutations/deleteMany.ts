import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"
import { BatchPayload } from "@/schema/objects"

export const deleteManyFollow = builder.mutationFields((t) => ({
  deleteManyFollow: t.field({
    type: BatchPayload,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.FollowWhereInput, required: true }),
    },
    resolve: async (root, args, context) => {
      const deletedBatch = await context.db.follow.deleteMany({
        where: args.where,
      })

      return deletedBatch
    }
  })
}))