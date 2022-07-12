import { Profile } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const findUniqueProfile = builder.queryFields((t) => ({
  findUniqueProfile: t.prismaField({
    type: Profile,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.ProfileWhereUniqueInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const found = await context.db.profile.findUnique({
        where: args.where,
        ...query,
      })

      return found
    }
  })
}))

export default findUniqueProfile