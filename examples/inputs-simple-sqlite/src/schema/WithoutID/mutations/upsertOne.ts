import { WithoutID } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const upsertOneWithoutID = builder.mutationFields((t) => ({
  upsertOneWithoutID: t.prismaField({
    type: WithoutID,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.WithoutIDWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.WithoutIDCreateInput, required: true }),
      update: t.arg({ type: Inputs.WithoutIDUpdateInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const upserted = await context.db.withoutID.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      })

      return upserted
    }
  })
}))

export default upsertOneWithoutID