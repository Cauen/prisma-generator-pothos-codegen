import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"
import { BatchPayload } from "@/schema/objects"

const updateManyIdOnly = builder.mutationFields((t) => ({
  updateManyIdOnly: t.field({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.IdOnlyWhereInput, required: false }),
      data: t.arg({ type: Inputs.IdOnlyUpdateManyMutationInput, required: true }),
    },
    resolve: async (root, args, context) => {
      const updatedBatch = await context.db.idOnly.updateMany({
        where: args.where || undefined,
        data: args.data,
      })

      return updatedBatch
    }
  })
}))

export default updateManyIdOnly