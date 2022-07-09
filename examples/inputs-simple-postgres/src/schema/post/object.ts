import { builder } from "../builder";
import * as Inputs from "@/generated/inputs";

export const Post = builder.prismaObject('Post', {
  description: "Post Model",
  findUnique: ({ id }) => ({ id: Number.parseInt(String(id || 1), 10) }),
  fields: (t) => ({
    id: t.exposeID('id'),
    content: t.exposeString('content', {description: "The content of the post"}),
    title: t.exposeString('title'),
    // Relation with generated input as arg
    Comments: t.relation('Comments', {
      args: {
        where: t.arg({ type: Inputs.CommentWhereInput, required: false }),
      },
      query: (args, context) => ({
        where: args.where || undefined,
      }),
    }),
  }),
});