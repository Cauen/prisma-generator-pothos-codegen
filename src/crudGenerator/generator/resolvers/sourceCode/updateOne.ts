export const updateOne = `import { #{model} } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"
#{imports}

export const updateOne#{model} = builder.mutationFields((t) => ({
  updateOne#{model}: t.prismaField({
    type: #{model},
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.#{model}WhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.#{model}UpdateInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const found = await #{db}.#{modelLowercase}.update({
        where: args.where || undefined,
        data: args.data || undefined,
        ...query,
      })

      return found
    }
  })
}))`