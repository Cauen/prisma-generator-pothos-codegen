export const createMany = `import { #{model} } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"
#{imports}

export const createMany#{model} = builder.mutationFields((t) => ({
  createMany#{model}: t.prismaField({
    type: [#{model}],
    nullable: false,
    args: {
      data: t.arg({ type: [Inputs.#{model}CreateInput], required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const list = await #{db}.$transaction(
        args.data.map((data) => #{db}.#{modelLowercase}.create({
          data: data,
        }))
      )

      return list
    }
  })
}))`