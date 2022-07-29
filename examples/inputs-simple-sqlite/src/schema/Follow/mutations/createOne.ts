import { Follow } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const createOneFollow = builder.mutationFields((t) => ({
  createOneFollow: t.prismaField({
    type: Follow,
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.FollowCreateInput, required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const created = await context.db.follow.create({
        data: args.data,
        ...query,
      })

      return created
    }
  })
}))