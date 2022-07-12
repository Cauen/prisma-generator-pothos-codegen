import { Profile } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const createManyProfile = builder.mutationFields((t) => ({
  createManyProfile: t.prismaField({
    type: [Profile],
    nullable: false,
    args: {
      data: t.arg({ type: [Inputs.ProfileCreateInput], required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const list = await context.db.$transaction(
        args.data.map((data) => context.db.profile.create({
          data: data,
        }))
      )

      return list
    }
  })
}))