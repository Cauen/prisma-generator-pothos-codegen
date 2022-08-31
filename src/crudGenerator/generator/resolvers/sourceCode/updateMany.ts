export const updateMany = `import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"
import { BatchPayload } from "@/schema/objects"
#{imports}

export const updateMany#{model} = builder.mutationFields((t) => ({
  updateMany#{model}: t.field({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.#{model}WhereInput, required: false }),
      data: t.arg({ type: Inputs.#{model}UpdateManyMutationInput, required: true }),
    },
    resolve: async (root, args, context) => {
      const updatedBatch = await #{db}.#{modelLowercase}.updateMany({
        where: args.where || undefined,
        data: args.data,
      })

      return updatedBatch
    }
  })
}))`;
