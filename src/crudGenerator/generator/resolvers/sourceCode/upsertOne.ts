export const upsertOne = `import { #{model} } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"
#{imports}

export const upsertOne#{model} = builder.mutationFields((t) => ({
  upsertOne#{model}: t.prismaField({
    type: #{model},
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.#{model}WhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.#{model}CreateInput, required: true }),
      update: t.arg({ type: Inputs.#{model}UpdateInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const upserted = await #{db}.#{modelLowercase}.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      })

      return upserted
    }
  })
}))`;
