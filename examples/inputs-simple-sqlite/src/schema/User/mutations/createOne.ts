import { User } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const createOneUser = builder.mutationFields((t) => ({
  createOneUser: t.field({
    type: User,
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.UserCreateInput, required: true }),
    },
    resolve: async (root, args, context, info) => {
      const created = await context.db.comment.create({
        data: args.data,
      })

      return created
    }
  })
}))

export default createOneUser