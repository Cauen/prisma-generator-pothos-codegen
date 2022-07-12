import { Profile } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const createOneProfile = builder.mutationFields((t) => ({
  createOneProfile: t.field({
    type: Profile,
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.ProfileCreateInput, required: true }),
    },
    resolve: async (root, args, context, info) => {
      const created = await context.db.comment.create({
        data: args.data,
      })

      return created
    }
  })
}))

export default createOneProfile