import { builder } from './builder';
import * as Objects from './objects';

const WithScalars = builder.prismaObject('WithScalars', Objects.WithScalarsObject);
const WithoutID = builder.prismaObject('WithoutID', Objects.WithoutIDObject);
const User = builder.prismaObject('User', Objects.UserObject);
const Unrelated = builder.prismaObject('Unrelated', Objects.UnrelatedObject);
const Profile = builder.prismaObject('Profile', Objects.ProfileObject);
const Post = builder.prismaObject('Post', Objects.PostObject);
const IdOnly = builder.prismaObject('IdOnly', Objects.IdOnlyObject);
const Follow = builder.prismaObject('Follow', Objects.FollowObject);
const Comment = builder.prismaObject('Comment', Objects.CommentObject);

builder.queryFields((t) => {
  const field = Objects.findManyUserQueryObject(t);
  return {
    findManyUser: t.prismaField({
      // Inherit all the generated properties
      ...field,

      // Modify the args and use custom arg in a custom resolver
      args: { ...field.args, customArg: t.arg({ type: 'Boolean', required: false }) },
      resolve: async (query, root, args, context, info) => {
        const { customArg } = args;
        console.log({ customArg });
        return field.resolve(query, root, args, context, info);
      },
    }),
    findFirstWithScalars: t.prismaField(Objects.findFirstWithScalarsQueryObject(t)),
    ...Objects.findUniqueWithScalarsQuery(t),
    ...Objects.findUniquePostQuery(t),
    ...Objects.findUniqueCommentQuery(t),
  };
});

builder.mutationFields((t) => {
  const field = Objects.createOneUserMutationObject(t);
  return {
    createOneUser: t.prismaField({
      // Inherit all the generated properties
      ...field,

      // Modify the args and use custom arg in a custom resolver
      args: { ...field.args, customArg: t.arg({ type: 'Boolean', required: false }) },
      resolve: async (query, root, args, context, info) => {
        const { customArg } = args;
        console.log({ customArg });
        return field.resolve(
          query,
          root,
          { data: { ...args.data, password: '123321' } },
          context,
          info,
        );
      },
    }),
    // findFirstWithScalars: t.prismaField(Objects.findFirstWithScalarsQueryObject(t)),
    // ...Objects.findUniqueWithScalarsQuery(t),
    // ...Objects.findUniquePostQuery(t),
    // ...Objects.findUniqueCommentQuery(t),
  };
});

builder.queryType({});
builder.mutationType({
  fields: (t) => ({
    createOneWithScalars: t.prismaField(Objects.createOneWithScalarsMutationObject(t)),
  }),
});

export const schema = builder.toSchema({});
