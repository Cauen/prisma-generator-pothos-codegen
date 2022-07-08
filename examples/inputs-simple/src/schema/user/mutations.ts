import { builder } from "../builder"
import { User } from "./object"
import * as Inputs from '@/generated/inputs'
import { db } from "@/db"

export const mutations = builder.mutationFields((t) => ({
  createOneUser: t.field({
    type: User,
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.UserCreateInput, required: true }),
    },
    resolve: async (root, args) => {
      const user = await db.user.create({
        data: args.data,
      })

      return user
    }
  })
}))
