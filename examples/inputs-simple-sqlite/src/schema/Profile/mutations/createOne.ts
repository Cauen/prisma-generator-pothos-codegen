import { Profile } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const createOneProfile = builder.mutationFields((t) => ({
  createOneProfile: t.prismaField({
    type: Profile,
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.ProfileCreateInput, required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const created = await context.db.profile.create({
        data: args.data,
        ...query,
      })

      return created
    }
  })
}))