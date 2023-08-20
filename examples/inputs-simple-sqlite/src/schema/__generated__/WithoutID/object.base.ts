import * as Inputs from '@/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

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
