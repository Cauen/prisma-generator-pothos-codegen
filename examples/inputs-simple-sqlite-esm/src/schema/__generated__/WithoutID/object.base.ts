import * as Inputs from '../inputs.js';
import { builder } from '../../builder.js';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils.js';

export const WithoutIDObject = definePrismaObject('WithoutID', {
  description: undefined,
  findUnique: (fields) => ({ ...fields }),
  fields: (t) => ({
    name: t.field(WithoutIDNameFieldObject),
  }),
});

export const WithoutIDNameFieldObject = defineFieldObject('WithoutID', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.name,
});
