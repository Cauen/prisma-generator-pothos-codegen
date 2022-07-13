export const findUnique = `import { #{model} } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"
#{imports}

const findUnique#{model} = builder.queryFields((t) => ({
  findUnique#{model}: t.prismaField({
    type: #{model},
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.#{model}WhereUniqueInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const found = await #{db}.#{modelLowercase}.findUnique({
        where: args.where,
        ...query,
      })

      return found
    }
  })
}))

export default findUnique#{model}`