import { WithoutID } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const createOneWithoutID = builder.mutationFields((t) => ({
  createOneWithoutID: t.field({
    type: WithoutID,
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.WithoutIDCreateInput, required: true }),
    },
    resolve: async (root, args, context, info) => {
      const created = await context.db.comment.create({
        data: args.data,
      })

      return created
    }
  })
}))

export default createOneWithoutID