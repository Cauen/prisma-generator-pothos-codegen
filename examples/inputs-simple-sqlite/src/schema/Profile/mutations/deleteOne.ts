import { Profile } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const deleteOneProfile = builder.mutationFields((t) => ({
  deleteOneProfile: t.prismaField({
    type: Profile,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.ProfileWhereUniqueInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const deleted = await context.db.profile.delete({
        where: args.where,
        ...query,
      })

      return deleted
    }
  })
}))