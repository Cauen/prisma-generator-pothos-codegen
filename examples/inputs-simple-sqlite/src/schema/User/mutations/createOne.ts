import { User } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const createOneUser = builder.mutationFields((t) => ({
  createOneUser: t.prismaField({
    type: User,
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.UserCreateInput, required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const created = await context.db.user.create({
        data: args.data,
        ...query,
      })

      return created
    }
  })
}))