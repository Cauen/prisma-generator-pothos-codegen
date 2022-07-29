import { Unrelated } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const createOneUnrelated = builder.mutationFields((t) => ({
  createOneUnrelated: t.prismaField({
    type: Unrelated,
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.UnrelatedCreateInput, required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const created = await context.db.unrelated.create({
        data: args.data,
        ...query,
      })

      return created
    }
  })
}))