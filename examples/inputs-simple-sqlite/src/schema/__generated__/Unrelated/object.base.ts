import * as Inputs from '@/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const UnrelatedObject = definePrismaObject('Unrelated', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', UnrelatedIdFieldObject),
    name: t.exposeString('name', UnrelatedNameFieldObject),
  }),
});

export const UnrelatedIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
});

export const UnrelatedNameFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: true,
});
