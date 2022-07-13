import { WithScalars } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const updateOneWithScalars = builder.mutationFields((t) => ({
  updateOneWithScalars: t.prismaField({
    type: WithScalars,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.WithScalarsWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.WithScalarsUpdateInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const found = await context.db.withScalars.update({
        where: args.where || undefined,
        data: args.data || undefined,
        ...query,
      })

      return found
    }
  })
}))

export default updateOneWithScalars