export const deleteOne = `import { #{model} } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const deleteOne#{model} = builder.mutationFields((t) => ({
  deleteOne#{model}: t.prismaField({
    type: #{model},
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.#{model}WhereUniqueInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const deleted = await context.db.#{modelLowercase}.delete({
        where: args.where,
        ...query,
      })

      return deleted
    }
  })
}))

export default deleteOne#{model}`