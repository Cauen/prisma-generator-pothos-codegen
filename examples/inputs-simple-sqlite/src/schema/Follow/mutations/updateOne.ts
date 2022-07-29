import { Follow } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const updateOneFollow = builder.mutationFields((t) => ({
  updateOneFollow: t.prismaField({
    type: Follow,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.FollowWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.FollowUpdateInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const found = await context.db.follow.update({
        where: args.where || undefined,
        data: args.data || undefined,
        ...query,
      })

      return found
    }
  })
}))