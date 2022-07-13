import { Profile } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const upsertOneProfile = builder.mutationFields((t) => ({
  upsertOneProfile: t.prismaField({
    type: Profile,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.ProfileWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.ProfileCreateInput, required: true }),
      update: t.arg({ type: Inputs.ProfileUpdateInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const upserted = await context.db.profile.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      })

      return upserted
    }
  })
}))

export default upsertOneProfile