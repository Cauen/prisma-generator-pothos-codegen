import { Follow } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const deleteOneFollow = builder.mutationFields((t) => ({
  deleteOneFollow: t.prismaField({
    type: Follow,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.FollowWhereUniqueInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const deleted = await context.db.follow.delete({
        where: args.where,
        ...query,
      })

      return deleted
    }
  })
}))