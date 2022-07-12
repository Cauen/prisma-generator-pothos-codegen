import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"
import { BatchPayload } from "@/schema/objects"

const deleteManyWithScalars = builder.mutationFields((t) => ({
  deleteManyWithScalars: t.field({
    type: BatchPayload,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.WithScalarsWhereInput, required: true }),
    },
    resolve: async (root, args, context) => {
      const deletedBatch = await context.db.withScalars.deleteMany({
        where: args.where,
      })

      return deletedBatch
    }
  })
}))

export default deleteManyWithScalars