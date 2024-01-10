import * as Inputs from '../inputs.js';
import { builder } from '../../builder.js';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils.js';

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
