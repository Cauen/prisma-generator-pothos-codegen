
// importing builder + inputs
import { builder } from "@/schema/builder";
import * as Inputs from "@/schema/inputs";

export const Comment = builder.prismaObject('Comment', {
  description: undefined, // defined inside schema as comment
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', { description: undefined, nullable: false, }),
    comment: t.exposeString('comment', { description: undefined, nullable: false, }),
    Author: t.relation('Author', {
      description: undefined,
      nullable: false,
      
    }),
    Post: t.relation('Post', {
      description: undefined,
      nullable: false,
      
    }),
    authorId: t.exposeInt('authorId', { description: undefined, nullable: false, }),
    postId: t.exposeInt('postId', { description: undefined, nullable: false, }),
  }),
});
