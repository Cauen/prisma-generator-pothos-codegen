export const deleteMany = `import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"
import { BatchPayload } from "@/schema/objects"
#{imports}

export const deleteMany#{model} = builder.mutationFields((t) => ({
  deleteMany#{model}: t.field({
    type: BatchPayload,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.#{model}WhereInput, required: true }),
    },
    resolve: async (root, args, context) => {
      const deletedBatch = await #{db}.#{modelLowercase}.deleteMany({
        where: args.where,
      })

      return deletedBatch
    }
  })
}))`;
