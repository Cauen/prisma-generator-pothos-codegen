import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"
import { BatchPayload } from "@/schema/objects"

const deleteManyUser = builder.mutationFields((t) => ({
  deleteManyUser: t.field({
    type: BatchPayload,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.UserWhereInput, required: true }),
    },
    resolve: async (root, args, context) => {
      const deletedBatch = await context.db.user.deleteMany({
        where: args.where,
      })

      return deletedBatch
    }
  })
}))

export default deleteManyUser