import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"
import { BatchPayload } from "@/schema/objects"

export const deleteManyProfile = builder.mutationFields((t) => ({
  deleteManyProfile: t.field({
    type: BatchPayload,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.ProfileWhereInput, required: true }),
    },
    resolve: async (root, args, context) => {
      const deletedBatch = await context.db.profile.deleteMany({
        where: args.where,
      })

      return deletedBatch
    }
  })
}))