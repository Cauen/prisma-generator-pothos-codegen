import { WithScalars } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const createOneWithScalars = builder.mutationFields((t) => ({
  createOneWithScalars: t.prismaField({
    type: WithScalars,
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.WithScalarsCreateInput, required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const created = await context.db.withScalars.create({
        data: args.data,
        ...query,
      })

      return created
    }
  })
}))