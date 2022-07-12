import { User } from "../object"
import * as Inputs from '@/schema/inputs'
import { builder } from "@/schema/builder"

const deleteOneUser = builder.mutationFields((t) => ({
  deleteOneUser: t.prismaField({
    type: User,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.UserWhereUniqueInput, required: true }),
    },
    resolve: async (query, root, args, context) => {
      const deleted = await context.db.user.delete({
        where: args.where,
        ...query,
      })

      return deleted
    }
  })
}))

export default deleteOneUser