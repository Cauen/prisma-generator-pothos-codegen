import * as Inputs from '../inputs';
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const ExtraModalObject = definePrismaObject('ExtraModal', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', ExtraModalIdFieldObject),
    title: t.exposeString('title', ExtraModalTitleFieldObject),
    createdAt: t.field(ExtraModalCreatedAtFieldObject),
    updatedAt: t.field(ExtraModalUpdatedAtFieldObject),
  }),
});

export const ExtraModalIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
});

export const ExtraModalTitleFieldObject = defineExposeObject('String', {
  description: 'The title of extramodal',
  nullable: false,
});

export const ExtraModalCreatedAtFieldObject = defineFieldObject('ExtraModal', {
  type: Inputs.DateTime,
  description: 'createdAt description',
  nullable: false,
  resolve: (parent) => parent.createdAt,
});

export const ExtraModalUpdatedAtFieldObject = defineFieldObject('ExtraModal', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.updatedAt,
});
