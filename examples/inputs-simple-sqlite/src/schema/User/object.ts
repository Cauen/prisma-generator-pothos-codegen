
// importing builder + inputs
import { builder } from "@/schema/builder";
import * as Inputs from "@/schema/inputs";

export const User = builder.prismaObject('User', {
  description: undefined, // defined inside schema as comment
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', { description: undefined, nullable: false, }),
    firstName: t.exposeString('firstName', { description: undefined, nullable: false, }),
    lastName: t.exposeString('lastName', { description: 'lastname description', nullable: false, }),
    Posts: t.relation('Posts', {
      description: 'relation desc',
      nullable: false,
      args: {
        where: t.arg({ type: Inputs.PostWhereInput, required: false }),
        orderBy: t.arg({ type: [Inputs.PostOrderByWithRelationInput], required: false }),
        cursor: t.arg({ type: Inputs.PostWhereUniqueInput, required: false }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({ type: [Inputs.PostScalarFieldEnum], required: false }),
      },
      query: (args, context) => ({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      })
    }),
    Comments: t.relation('Comments', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({ type: Inputs.CommentWhereInput, required: false }),
        orderBy: t.arg({ type: [Inputs.CommentOrderByWithRelationInput], required: false }),
        cursor: t.arg({ type: Inputs.CommentWhereUniqueInput, required: false }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({ type: [Inputs.CommentScalarFieldEnum], required: false }),
      },
      query: (args, context) => ({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      })
    }),
    createdAt: t.field({
      type: "DateTime",
      description: 'createdAt description',
      nullable: false,
      resolve: (parent, args, ctx) => parent.createdAt
    }),
    updatedAt: t.field({
      type: "DateTime",
      description: undefined,
      nullable: true,
      resolve: (parent, args, ctx) => parent.updatedAt
    }),
    Profile: t.relation('Profile', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({ type: Inputs.ProfileWhereInput, required: false }),
        orderBy: t.arg({ type: [Inputs.ProfileOrderByWithRelationInput], required: false }),
        cursor: t.arg({ type: Inputs.ProfileWhereUniqueInput, required: false }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({ type: [Inputs.ProfileScalarFieldEnum], required: false }),
      },
      query: (args, context) => ({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      })
    }),
    Followers: t.relation('Followers', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({ type: Inputs.FollowWhereInput, required: false }),
        orderBy: t.arg({ type: [Inputs.FollowOrderByWithRelationInput], required: false }),
        cursor: t.arg({ type: Inputs.FollowWhereUniqueInput, required: false }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({ type: [Inputs.FollowScalarFieldEnum], required: false }),
      },
      query: (args, context) => ({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      })
    }),
    Following: t.relation('Following', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({ type: Inputs.FollowWhereInput, required: false }),
        orderBy: t.arg({ type: [Inputs.FollowOrderByWithRelationInput], required: false }),
        cursor: t.arg({ type: Inputs.FollowWhereUniqueInput, required: false }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({ type: [Inputs.FollowScalarFieldEnum], required: false }),
      },
      query: (args, context) => ({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      })
    }),
  }),
});
