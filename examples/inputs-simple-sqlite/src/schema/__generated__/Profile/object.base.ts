import * as Inputs from '@/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const ProfileObject = definePrismaObject('Profile', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', ProfileIdFieldObject),
    bio: t.exposeString('bio', ProfileBioFieldObject),
    User: t.relation('User', ProfileUserFieldObject),
    userId: t.exposeInt('userId', ProfileUserIdFieldObject),
  }),
});

export const ProfileIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
});

export const ProfileBioFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: true,
});

export const ProfileUserFieldObject = defineRelationObject('Profile', 'User', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const ProfileUserIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
});
