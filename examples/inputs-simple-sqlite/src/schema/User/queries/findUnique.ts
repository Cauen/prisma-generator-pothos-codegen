import { User } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const findUniqueUser = builder.queryFields((t) => ({
  findUniqueUser: t.prismaField({
    type: User,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.UserWhereUniqueInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const found = await context.db.user.findUnique({
        where: args.where,
        ...query,
      })

      return found
    }
  })
}))