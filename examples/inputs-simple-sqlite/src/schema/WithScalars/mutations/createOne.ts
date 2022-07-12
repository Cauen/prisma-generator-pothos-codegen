import { WithScalars } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const createOneWithScalars = builder.mutationFields((t) => ({
  createOneWithScalars: t.field({
    type: WithScalars,
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.WithScalarsCreateInput, required: true }),
    },
    resolve: async (root, args, context, info) => {
      const created = await context.db.comment.create({
        data: args.data,
      })

      return created
    }
  })
}))

export default createOneWithScalars