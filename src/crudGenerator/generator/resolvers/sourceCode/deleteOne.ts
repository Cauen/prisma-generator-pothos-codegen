export const deleteOne = `import { #{model} } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"
#{imports}

export const deleteOne#{model} = builder.mutationFields((t) => ({
  deleteOne#{model}: t.prismaField({
    type: #{model},
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.#{model}WhereUniqueInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const deleted = await #{db}.#{modelLowercase}.delete({
        where: args.where,
        ...query,
      })

      return deleted
    }
  })
}))`