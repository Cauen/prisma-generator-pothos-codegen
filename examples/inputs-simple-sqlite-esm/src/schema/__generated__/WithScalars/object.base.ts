import * as Inputs from '../inputs.js';
import { builder } from '../../builder.js';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils.js';

export const WithScalarsObject = definePrismaObject('WithScalars', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(WithScalarsIdFieldObject),
    string: t.field(WithScalarsStringFieldObject),
    boolean: t.field(WithScalarsBooleanFieldObject),
    int: t.field(WithScalarsIntFieldObject),
    float: t.field(WithScalarsFloatFieldObject),
    decimal: t.field(WithScalarsDecimalFieldObject),
    bigint: t.field(WithScalarsBigintFieldObject),
    datetime: t.field(WithScalarsDatetimeFieldObject),
    bytes: t.field(WithScalarsBytesFieldObject),
  }),
});

export const WithScalarsIdFieldObject = defineFieldObject('WithScalars', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const WithScalarsStringFieldObject = defineFieldObject('WithScalars', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.string,
});

export const WithScalarsBooleanFieldObject = defineFieldObject('WithScalars', {
  type: "Boolean",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.boolean,
});

export const WithScalarsIntFieldObject = defineFieldObject('WithScalars', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.int,
});

export const WithScalarsFloatFieldObject = defineFieldObject('WithScalars', {
  type: "Float",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.float,
});

export const WithScalarsDecimalFieldObject = defineFieldObject('WithScalars', {
  type: Inputs.Decimal,
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.decimal,
});

export const WithScalarsBigintFieldObject = defineFieldObject('WithScalars', {
  type: Inputs.Bigint,
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.bigint,
});

export const WithScalarsDatetimeFieldObject = defineFieldObject('WithScalars', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.datetime,
});

export const WithScalarsBytesFieldObject = defineFieldObject('WithScalars', {
  type: Inputs.Bytes,
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.bytes,
});
