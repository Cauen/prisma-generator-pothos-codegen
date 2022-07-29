export const createOne = `import { #{model} } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"
#{imports}

export const createOne#{model} = builder.mutationFields((t) => ({
  createOne#{model}: t.prismaField({
    type: #{model},
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.#{model}CreateInput, required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const created = await #{db}.#{modelLowercase}.create({
        data: args.data,
        ...query,
      })

      return created
    }
  })
}))`