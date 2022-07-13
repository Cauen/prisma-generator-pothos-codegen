import { Unrelated } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const createOneUnrelated = builder.mutationFields((t) => ({
  createOneUnrelated: t.field({
    type: Unrelated,
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.UnrelatedCreateInput, required: true }),
    },
    resolve: async (root, args, context, info) => {
      const created = await context.db.comment.create({
        data: args.data,
      })

      return created
    }
  })
}))

export default createOneUnrelated