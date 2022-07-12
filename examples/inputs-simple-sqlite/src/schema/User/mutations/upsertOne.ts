import { User } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const upsertOneUser = builder.mutationFields((t) => ({
  upsertOneUser: t.prismaField({
    type: User,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.UserWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.UserCreateInput, required: true }),
      update: t.arg({ type: Inputs.UserUpdateInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const upserted = await context.db.user.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      })

      return upserted
    }
  })
}))

export default upsertOneUser