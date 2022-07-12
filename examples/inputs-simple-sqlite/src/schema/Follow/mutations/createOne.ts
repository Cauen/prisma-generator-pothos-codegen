import { Follow } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const createOneFollow = builder.mutationFields((t) => ({
  createOneFollow: t.field({
    type: Follow,
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.FollowCreateInput, required: true }),
    },
    resolve: async (root, args, context, info) => {
      const created = await context.db.comment.create({
        data: args.data,
      })

      return created
    }
  })
}))

export default createOneFollow