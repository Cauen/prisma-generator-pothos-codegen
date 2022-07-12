import { Follow } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const createManyFollow = builder.mutationFields((t) => ({
  createManyFollow: t.prismaField({
    type: [Follow],
    nullable: false,
    args: {
      data: t.arg({ type: [Inputs.FollowCreateInput], required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const list = await context.db.$transaction(
        args.data.map((data) => context.db.follow.create({
          data: data,
        }))
      )

      return list
    }
  })
}))