import { Profile } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const updateOneProfile = builder.mutationFields((t) => ({
  updateOneProfile: t.prismaField({
    type: Profile,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.ProfileWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.ProfileUpdateInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const found = await context.db.profile.update({
        where: args.where || undefined,
        data: args.data || undefined,
        ...query,
      })

      return found
    }
  })
}))

export default updateOneProfile