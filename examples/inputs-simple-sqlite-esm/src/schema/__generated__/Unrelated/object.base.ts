import * as Inputs from '../inputs.js';
import { builder } from '../../builder.js';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils.js';

export const UnrelatedObject = definePrismaObject('Unrelated', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(UnrelatedIdFieldObject),
    name: t.field(UnrelatedNameFieldObject),
  }),
});

export const UnrelatedIdFieldObject = defineFieldObject('Unrelated', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const UnrelatedNameFieldObject = defineFieldObject('Unrelated', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.name,
});
