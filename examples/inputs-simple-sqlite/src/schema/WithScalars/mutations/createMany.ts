import { WithScalars } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

export const createManyWithScalars = builder.mutationFields((t) => ({
  createManyWithScalars: t.prismaField({
    type: [WithScalars],
    nullable: false,
    args: {
      data: t.arg({ type: [Inputs.WithScalarsCreateInput], required: true }),
    },
    resolve: async (query, root, args, context, info) => {
      const list = await context.db.$transaction(
        args.data.map((data) => context.db.withScalars.create({
          data: data,
        }))
      )

      return list
    }
  })
}))