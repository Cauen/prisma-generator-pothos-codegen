import { User } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const updateOneUser = builder.mutationFields((t) => ({
  updateOneUser: t.prismaField({
    type: User,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.UserWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.UserUpdateInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const found = await context.db.user.update({
        where: args.where || undefined,
        data: args.data || undefined,
        ...query,
      })

      return found
    }
  })
}))