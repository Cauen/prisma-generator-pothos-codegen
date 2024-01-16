import * as Inputs from '../inputs.js';
import { builder } from '../../builder.js';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils.js';

export const IdOnlyObject = definePrismaObject('IdOnly', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(IdOnlyIdFieldObject),
  }),
});

export const IdOnlyIdFieldObject = defineFieldObject('IdOnly', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});
