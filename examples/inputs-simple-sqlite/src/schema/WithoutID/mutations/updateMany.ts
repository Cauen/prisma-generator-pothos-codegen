import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"
import { BatchPayload } from "@/schema/objects"

const updateManyWithoutID = builder.mutationFields((t) => ({
  updateManyWithoutID: t.field({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.WithoutIDWhereInput, required: false }),
      data: t.arg({ type: Inputs.WithoutIDUpdateManyMutationInput, required: true }),
    },
    resolve: async (root, args, context) => {
      const updatedBatch = await context.db.withoutID.updateMany({
        where: args.where || undefined,
        data: args.data,
      })

      return updatedBatch
    }
  })
}))

export default updateManyWithoutID