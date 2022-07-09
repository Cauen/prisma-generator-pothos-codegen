import { builder } from "../builder";
import * as Inputs from "@/generated/inputs";

export const User = builder.prismaObject('User', {
  findUnique: ({ id }) => ({ id: Number.parseInt(String(id || 1), 10) }),
  fields: (t) => ({
    id: t.exposeID('id'),
    firstName: t.exposeString('firstName'),
    lastName: t.exposeString('lastName'),
    // Computed field
    fullName: t.string({
      resolve: (user, args, ctx, info) => {
        console.log({ args, ctx, info })
        return `${user.firstName} ${user.lastName}`
      },
    }),
    // Relation with generated input as arg
    Posts: t.relation('Posts', {
      args: {
        where: t.arg({ type: Inputs.PostWhereInput, required: false }),
      },
      query: (args, context) => ({
        where: args.where || undefined,
      }),
    }),
    Comments: t.relation('Comments'),
    Followers: t.relation('Followers'),
    Following: t.relation('Following'),
    Profile: t.relation('Profile'),
  }),
});