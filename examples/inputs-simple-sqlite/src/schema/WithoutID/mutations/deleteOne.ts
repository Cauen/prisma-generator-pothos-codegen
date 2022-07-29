import { WithoutID } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const deleteOneWithoutID = builder.mutationFields((t) => ({
  deleteOneWithoutID: t.prismaField({
    type: WithoutID,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.WithoutIDWhereUniqueInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const deleted = await context.db.withoutID.delete({
        where: args.where,
        ...query,
      })

      return deleted
    }
  })
}))