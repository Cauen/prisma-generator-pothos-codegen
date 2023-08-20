import * as Inputs from '@/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const UserObject = definePrismaObject('User', {
  description: 'User of prisma',
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(UserIdFieldObject),
    firstName: t.field(UserFirstNameFieldObject),
    lastName: t.field(UserLastNameFieldObject),
    birthdate: t.field(UserBirthdateFieldObject),
    login: t.field(UserLoginFieldObject),
    password: t.field(UserPasswordFieldObject),
    Posts: t.relation('Posts', UserPostsFieldObject(t)),
    Comments: t.relation('Comments', UserCommentsFieldObject(t)),
    createdAt: t.field(UserCreatedAtFieldObject),
    updatedAt: t.field(UserUpdatedAtFieldObject),
    Profile: t.relation('Profile', UserProfileFieldObject(t)),
    Followers: t.relation('Followers', UserFollowersFieldObject(t)),
    Following: t.relation('Following', UserFollowingFieldObject(t)),
  }),
});

export const UserIdFieldObject = defineFieldObject('User', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const UserFirstNameFieldObject = defineFieldObject('User', {
  type: "String",
  description: 'firstname description',
  nullable: false,
  resolve: (parent) => parent.firstName,
});

export const UserLastNameFieldObject = defineFieldObject('User', {
  type: "String",
  description: 'lastname description',
  nullable: false,
  resolve: (parent) => parent.lastName,
});

export const UserBirthdateFieldObject = defineFieldObject('User', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.birthdate,
});

export const UserLoginFieldObject = defineFieldObject('User', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.login,
});

export const UserPasswordFieldObject = defineFieldObject('User', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.password,
});

export const UserPostsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.PostWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.PostOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.PostWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.PostScalarFieldEnum], required: false }),
}))

export const UserPostsFieldObject = defineRelationFunction('User', (t) =>
  defineRelationObject('User', 'Posts', {
    description: 'relation desc ',
    nullable: false,
    args: UserPostsFieldArgs,
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);

export const UserCommentsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.CommentWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.CommentOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.CommentWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.CommentScalarFieldEnum], required: false }),
}))

export const UserCommentsFieldObject = defineRelationFunction('User', (t) =>
  defineRelationObject('User', 'Comments', {
    description: undefined,
    nullable: false,
    args: UserCommentsFieldArgs,
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);

export const UserCreatedAtFieldObject = defineFieldObject('User', {
  type: Inputs.DateTime,
  description: 'createdAt description',
  nullable: false,
  resolve: (parent) => parent.createdAt,
});

export const UserUpdatedAtFieldObject = defineFieldObject('User', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.updatedAt,
});

export const UserProfileFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.ProfileWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.ProfileOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.ProfileWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.ProfileScalarFieldEnum], required: false }),
}))

export const UserProfileFieldObject = defineRelationFunction('User', (t) =>
  defineRelationObject('User', 'Profile', {
    description: undefined,
    nullable: false,
    args: UserProfileFieldArgs,
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);

export const UserFollowersFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.FollowWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.FollowOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.FollowWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.FollowScalarFieldEnum], required: false }),
}))

export const UserFollowersFieldObject = defineRelationFunction('User', (t) =>
  defineRelationObject('User', 'Followers', {
    description: undefined,
    nullable: false,
    args: UserFollowersFieldArgs,
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);

export const UserFollowingFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.FollowWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.FollowOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.FollowWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.FollowScalarFieldEnum], required: false }),
}))

export const UserFollowingFieldObject = defineRelationFunction('User', (t) =>
  defineRelationObject('User', 'Following', {
    description: undefined,
    nullable: false,
    args: UserFollowingFieldArgs,
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);
