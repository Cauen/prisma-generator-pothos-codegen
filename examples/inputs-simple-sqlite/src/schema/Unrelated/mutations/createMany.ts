import { Unrelated } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const createManyUnrelated = builder.mutationFields((t) => ({
  createManyUnrelated: t.prismaField({
    type: [Unrelated],
    nullable: false,
    args: {
      data: t.arg({ type: [Inputs.UnrelatedCreateInput], required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const list = await context.db.$transaction(
        args.data.map((data) => context.db.unrelated.create({
          data: data,
        }))
      )

      return list
    }
  })
}))