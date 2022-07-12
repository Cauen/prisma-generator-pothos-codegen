import { IdOnly } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const deleteOneIdOnly = builder.mutationFields((t) => ({
  deleteOneIdOnly: t.prismaField({
    type: IdOnly,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.IdOnlyWhereUniqueInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const deleted = await context.db.idOnly.delete({
        where: args.where,
        ...query,
      })

      return deleted
    }
  })
}))

export default deleteOneIdOnly