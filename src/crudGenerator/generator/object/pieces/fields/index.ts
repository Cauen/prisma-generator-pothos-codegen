import { DMMF } from '@prisma/generator-helper';
import { firstLetterUpperCase } from '../../../../../utils/string';

const getFieldValue = (field: DMMF.Field) => {
  const { isId, type, name, relationName, isRequired, documentation, isList } = field;
  const description = `description: ${documentation ? `'${documentation}'` : 'undefined'},`;
  const nullable = `nullable: ${isRequired ? 'false' : 'true'},`;
  const exposeOptions = `{ ${description} ${nullable} }`;

  if (isId === true) return `t.exposeID('${name}', ${exposeOptions})`;
  if (type === 'String') return `t.exposeString('${name}', ${exposeOptions})`;
  if (type === 'Int') return `t.exposeInt('${name}', ${exposeOptions})`;
  if (type === 'Float') return `t.exposeFloat('${name}', ${exposeOptions})`;
  if (type === 'Boolean') return `t.exposeBoolean('${name}', ${exposeOptions})`;
  if (relationName)
    return `t.relation('${name}', {
      ${description}
      ${nullable}
      ${
        isList
          ? `args: {
        where: t.arg({ type: Inputs.${type}WhereInput, required: false }),
        orderBy: t.arg({ type: [Inputs.${type}OrderByWithRelationInput], required: false }),
        cursor: t.arg({ type: Inputs.${type}WhereUniqueInput, required: false }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({ type: [Inputs.${firstLetterUpperCase(
          type,
        )}ScalarFieldEnum], required: false }),
      },
      query: (args, context) => ({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      })`
          : ''
      }
    })`;

  // DateTime, Json ... ENUMS
  const typeFixed = type === 'BigInt' ? 'Bigint' : type;
  return `t.field({
      type: Inputs.${typeFixed},
      ${description}
      ${nullable}
      resolve: (parent, args, ctx) => parent.${name}
    })`;
};

export const getFieldsSrc = (foundModel: DMMF.Model) => {
  const fields = foundModel.fields
    .map((field) => {
      return `${field.name}: ${getFieldValue(field)},`;
    })
    .join('\n    ');
  return fields;
};
