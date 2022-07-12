import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"
import { BatchPayload } from "@/schema/objects"

const deleteManyWithoutID = builder.mutationFields((t) => ({
  deleteManyWithoutID: t.field({
    type: BatchPayload,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.WithoutIDWhereInput, required: true }),
    },
    resolve: async (root, args, context) => {
      const deletedBatch = await context.db.withoutID.deleteMany({
        where: args.where,
      })

      return deletedBatch
    }
  })
}))

export default deleteManyWithoutID