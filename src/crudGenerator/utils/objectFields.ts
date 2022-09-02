import { DMMF } from '@prisma/generator-helper';
import { useTemplate } from '../../utils/template';
import {
  fieldTemplate,
  relationArgsTemplate,
  relationQueryTemplate,
  relationTemplate,
} from '../templates/object';

export const getObjectFieldValue = (field: DMMF.Field) => {
  const { isId, type, name, relationName, isRequired, documentation, isList } = field;
  const description = documentation ? `'${documentation}'` : 'undefined';
  const nullable = isRequired ? 'false' : 'true';

  const exposeOptions = `{ description: ${description}, nullable: ${nullable} }`;

  if (isId === true) return `t.exposeID('${name}', ${exposeOptions})`;
  if (type === 'String') return `t.exposeString('${name}', ${exposeOptions})`;
  if (type === 'Int') return `t.exposeInt('${name}', ${exposeOptions})`;
  if (type === 'Float') return `t.exposeFloat('${name}', ${exposeOptions})`;
  if (type === 'Boolean') return `t.exposeBoolean('${name}', ${exposeOptions})`;
  if (relationName)
    return useTemplate(relationTemplate, {
      name,
      description,
      nullable,
      args: isList ? useTemplate(relationArgsTemplate, { inputType: type }) : 'undefined',
      query: isList ? useTemplate(relationQueryTemplate, {}) : 'undefined',
    });

  // DateTime, Json, ENUMs, etc
  const fieldType = type === 'BigInt' ? 'Bigint' : type;
  return useTemplate(fieldTemplate, { fieldType, description, nullable, name });
};
