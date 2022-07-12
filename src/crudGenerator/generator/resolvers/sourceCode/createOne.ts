export const createOne = `import { #{model} } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"
#{imports}

const createOne#{model} = builder.mutationFields((t) => ({
  createOne#{model}: t.field({
    type: #{model},
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.#{model}CreateInput, required: true }),
    },
    resolve: async (root, args, context, info) => {
      const created = await #{db}.comment.create({
        data: args.data,
      })

      return created
    }
  })
}))

export default createOne#{model}`