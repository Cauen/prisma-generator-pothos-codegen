import * as Inputs from '@/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const ProfileObject = definePrismaObject('Profile', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(ProfileIdFieldObject),
    bio: t.field(ProfileBioFieldObject),
    User: t.relation('User', ProfileUserFieldObject),
    userId: t.field(ProfileUserIdFieldObject),
  }),
});

export const ProfileIdFieldObject = defineFieldObject('Profile', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const ProfileBioFieldObject = defineFieldObject('Profile', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.bio,
});

export const ProfileUserFieldObject = defineRelationObject('Profile', 'User', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const ProfileUserIdFieldObject = defineFieldObject('Profile', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.userId,
});
