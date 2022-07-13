import { WithScalars } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const deleteOneWithScalars = builder.mutationFields((t) => ({
  deleteOneWithScalars: t.prismaField({
    type: WithScalars,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.WithScalarsWhereUniqueInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const deleted = await context.db.withScalars.delete({
        where: args.where,
        ...query,
      })

      return deleted
    }
  })
}))

export default deleteOneWithScalars