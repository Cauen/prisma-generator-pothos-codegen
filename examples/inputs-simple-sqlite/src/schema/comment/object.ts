import { builder } from "../builder";

export const Comment = builder.prismaObject('Comment', {
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    comment: t.exposeString('comment'),
    authorId: t.exposeInt('authorId'),
    postId: t.exposeInt('postId'),
    Author: t.relation('Author'),
    Post: t.relation('Post'),
  }),
  description: "",
  name: "Batata"
});
