import { IdOnly } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const createOneIdOnly = builder.mutationFields((t) => ({
  createOneIdOnly: t.field({
    type: IdOnly,
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.IdOnlyCreateInput, required: true }),
    },
    resolve: async (root, args, context, info) => {
      const created = await context.db.comment.create({
        data: args.data,
      })

      return created
    }
  })
}))

export default createOneIdOnly