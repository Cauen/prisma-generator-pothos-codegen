import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"
import { BatchPayload } from "@/schema/objects"

const deleteManyUnrelated = builder.mutationFields((t) => ({
  deleteManyUnrelated: t.field({
    type: BatchPayload,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.UnrelatedWhereInput, required: true }),
    },
    resolve: async (root, args, context) => {
      const deletedBatch = await context.db.unrelated.deleteMany({
        where: args.where,
      })

      return deletedBatch
    }
  })
}))

export default deleteManyUnrelated