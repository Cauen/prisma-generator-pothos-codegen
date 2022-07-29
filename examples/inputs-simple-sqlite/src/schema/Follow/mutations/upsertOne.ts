import { Follow } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const upsertOneFollow = builder.mutationFields((t) => ({
  upsertOneFollow: t.prismaField({
    type: Follow,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.FollowWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.FollowCreateInput, required: true }),
      update: t.arg({ type: Inputs.FollowUpdateInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const upserted = await context.db.follow.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      })

      return upserted
    }
  })
}))