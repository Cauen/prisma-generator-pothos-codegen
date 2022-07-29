import { IdOnly } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const updateOneIdOnly = builder.mutationFields((t) => ({
  updateOneIdOnly: t.prismaField({
    type: IdOnly,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.IdOnlyWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.IdOnlyUpdateInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const found = await context.db.idOnly.update({
        where: args.where || undefined,
        data: args.data || undefined,
        ...query,
      })

      return found
    }
  })
}))