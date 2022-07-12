import { Unrelated } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const updateOneUnrelated = builder.mutationFields((t) => ({
  updateOneUnrelated: t.prismaField({
    type: Unrelated,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.UnrelatedWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.UnrelatedUpdateInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const found = await context.db.unrelated.update({
        where: args.where || undefined,
        data: args.data || undefined,
        ...query,
      })

      return found
    }
  })
}))

export default updateOneUnrelated