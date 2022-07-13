import { User } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const createManyUser = builder.mutationFields((t) => ({
  createManyUser: t.prismaField({
    type: [User],
    nullable: false,
    args: {
      data: t.arg({ type: [Inputs.UserCreateInput], required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const list = await context.db.$transaction(
        args.data.map((data) => context.db.user.create({
          data: data,
        }))
      )

      return list
    }
  })
}))