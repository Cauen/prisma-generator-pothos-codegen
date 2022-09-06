// TODO only import what is necessary
export const objectTemplate = `import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';
#{inputsImporter}

export const #{modelName}Object = definePrismaObject('#{modelName}', {
  description: #{description},
  findUnique: #{findUnique},
  fields: (t) => ({
    #{fields}
  }),
});

#{exportFields}
`;

export const exposeObjectTemplate = `export const #{modelName}#{nameUpper}FieldObject = defineExposeObject('#{type}', {
  description: #{description},
  nullable: #{nullable},
});`;

export const fieldObjectTemplate = `export const #{modelName}#{nameUpper}FieldObject = defineFieldObject('#{modelName}', {
  type: Inputs.#{type},
  description: #{description},
  nullable: #{nullable},
  resolve: (parent) => parent.#{name},
});`;

export const listRelationObjectTemplate = `export const #{modelName}#{nameUpper}FieldObject = defineRelationFunction('#{modelName}', (t) =>
  defineRelationObject('#{modelName}', '#{name}', {
    description: #{description},
    nullable: #{nullable},
    args: {
      where: t.arg({ type: Inputs.#{type}WhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.#{type}OrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.#{type}WhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.#{type}ScalarFieldEnum], required: false }),
    },
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);`;

export const relationObjectTemplate = `export const #{modelName}#{nameUpper}FieldObject = defineRelationObject('#{modelName}', '#{name}', {
  description: #{description},
  nullable: #{nullable},
  args: undefined,
  query: undefined,
});`;
