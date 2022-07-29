import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"
import { BatchPayload } from "@/schema/objects"

export const deleteManyIdOnly = builder.mutationFields((t) => ({
  deleteManyIdOnly: t.field({
    type: BatchPayload,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.IdOnlyWhereInput, required: true }),
    },
    resolve: async (root, args, context) => {
      const deletedBatch = await context.db.idOnly.deleteMany({
        where: args.where,
      })

      return deletedBatch
    }
  })
}))