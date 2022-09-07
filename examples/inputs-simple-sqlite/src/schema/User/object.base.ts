import * as Inputs from '../inputs';
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const UserObject = definePrismaObject('User', {
  description: 'User of prisma',
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', UserIdFieldObject),
    firstName: t.exposeString('firstName', UserFirstNameFieldObject),
    lastName: t.exposeString('lastName', UserLastNameFieldObject),
    birthdate: t.field(UserBirthdateFieldObject),
    login: t.exposeString('login', UserLoginFieldObject),
    password: t.exposeString('password', UserPasswordFieldObject),
    Posts: t.relation('Posts', UserPostsFieldObject(t)),
    Comments: t.relation('Comments', UserCommentsFieldObject(t)),
    createdAt: t.field(UserCreatedAtFieldObject),
    updatedAt: t.field(UserUpdatedAtFieldObject),
    Profile: t.relation('Profile', UserProfileFieldObject(t)),
    Followers: t.relation('Followers', UserFollowersFieldObject(t)),
    Following: t.relation('Following', UserFollowingFieldObject(t)),
  }),
});

export const UserIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
});

export const UserFirstNameFieldObject = defineExposeObject('String', {
  description: 'firstname description',
  nullable: false,
});

export const UserLastNameFieldObject = defineExposeObject('String', {
  description: 'lastname description',
  nullable: false,
});

export const UserBirthdateFieldObject = defineFieldObject('User', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.birthdate,
});

export const UserLoginFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
});

export const UserPasswordFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
});

export const UserPostsFieldObject = defineRelationFunction('User', (t) =>
  defineRelationObject('User', 'Posts', {
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

export const UserCommentsFieldObject = defineRelationFunction('User', (t) =>
  defineRelationObject('User', 'Comments', {
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

export const UserProfileFieldObject = defineRelationFunction('User', (t) =>
  defineRelationObject('User', 'Profile', {
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

export const UserFollowersFieldObject = defineRelationFunction('User', (t) =>
  defineRelationObject('User', 'Followers', {
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

export const UserFollowingFieldObject = defineRelationFunction('User', (t) =>
  defineRelationObject('User', 'Following', {
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
