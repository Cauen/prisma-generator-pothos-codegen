import * as Inputs from '../inputs';
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const WithoutIDObject = definePrismaObject('WithoutID', {
  description: undefined,
  findUnique: (fields) => ({ ...fields }),
  fields: (t) => ({
    name: t.exposeString('name', WithoutIDNameFieldObject),
  }),
});

export const WithoutIDNameFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
});
