import { Unrelated } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const deleteOneUnrelated = builder.mutationFields((t) => ({
  deleteOneUnrelated: t.prismaField({
    type: Unrelated,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.UnrelatedWhereUniqueInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const deleted = await context.db.unrelated.delete({
        where: args.where,
        ...query,
      })

      return deleted
    }
  })
}))

export default deleteOneUnrelated