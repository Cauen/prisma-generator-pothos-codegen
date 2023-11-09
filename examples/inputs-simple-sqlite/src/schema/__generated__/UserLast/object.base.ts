import * as Inputs from '@/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const UserLastObject = definePrismaObject('UserLast', {
  description: 'Its for check for duplicating User.LastName and UserLast.Name',
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(UserLastIdFieldObject),
    name: t.field(UserLastNameFieldObject),
  }),
});

export const UserLastIdFieldObject = defineFieldObject('UserLast', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const UserLastNameFieldObject = defineFieldObject('UserLast', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.name,
});
