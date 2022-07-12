import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"
import { BatchPayload } from "@/schema/objects"

const updateManyPost = builder.mutationFields((t) => ({
  updateManyPost: t.field({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.PostWhereInput, required: false }),
      data: t.arg({ type: Inputs.PostUpdateManyMutationInput, required: true }),
    },
    resolve: async (root, args, context) => {
      const updatedBatch = await context.db.post.updateMany({
        where: args.where || undefined,
        data: args.data,
      })

      return updatedBatch
    }
  })
}))

export default updateManyPost