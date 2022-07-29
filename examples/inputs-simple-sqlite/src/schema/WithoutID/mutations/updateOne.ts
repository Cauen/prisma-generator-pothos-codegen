import { WithoutID } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const updateOneWithoutID = builder.mutationFields((t) => ({
  updateOneWithoutID: t.prismaField({
    type: WithoutID,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.WithoutIDWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.WithoutIDUpdateInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const found = await context.db.withoutID.update({
        where: args.where || undefined,
        data: args.data || undefined,
        ...query,
      })

      return found
    }
  })
}))