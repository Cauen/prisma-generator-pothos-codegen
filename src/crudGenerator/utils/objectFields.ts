import { ConfigInternal } from '../../utils/config';
import { firstLetterUpperCase } from '../../utils/string';
import { useTemplate } from '../../utils/template';
import {
  relationObjectTemplate,
  listRelationObjectTemplate,
  fieldObjectTemplate,
} from '../templates/object';
import type { DMMF } from '@prisma/generator-helper';

const cleanifyDocumentation = (str?: string) => str?.replace(/\s*@Pothos\.omit\(.*\)\s*/, '');

export const getObjectFieldsString = (
  modelName: string,
  fields: DMMF.Field[],
  config: ConfigInternal,
): { fields: string[]; exportFields: string[] } =>
  fields.reduce(
    (
      { fields, exportFields },
      { isId, type: fieldType, name, relationName, isRequired, documentation, isList },
    ) => {
      const nameUpper = firstLetterUpperCase(name);
      const cleanDocumentation = cleanifyDocumentation(documentation);
      const description = cleanDocumentation ? `'${cleanDocumentation}'` : 'undefined'; // field description defined in schema.prisma
      const nullable = isRequired ? 'false' : 'true';
      const type = fieldType === 'BigInt' ? 'Bigint' : fieldType;
      const obj = `${modelName}${nameUpper}FieldObject`;
      const templateOpts = { modelName, name, nameUpper, description, nullable, type };

      // Relation
      if (relationName) {
        fields.push(`${name}: t.relation('${name}', ${obj}${isList ? '(t)' : ''}),`);
        if (isList)
          exportFields.push(
            useTemplate(listRelationObjectTemplate, {
              ...templateOpts,
              typeUpper: firstLetterUpperCase(templateOpts.type),
            }),
          );
        else exportFields.push(useTemplate(relationObjectTemplate, templateOpts));
        return { fields, exportFields };
      }

      // Scalar (DateTime, Json, Enums, etc.)
      fields.push(`${name}: t.field(${obj}),`);

      const shouldBeGraphqlId = isId && config.crud.mapIdFieldsToGraphqlId === 'Objects';

      exportFields.push(
        useTemplate(fieldObjectTemplate, {
          ...templateOpts,
          conditionalType: (() => {
            const type = templateOpts.type;
            const isNativeType = ['String', 'Int', 'Float', 'Boolean'].includes(type);
            const importedType = (() => {
              if (shouldBeGraphqlId) return `"ID"`;
              return isNativeType ? `"${type}"` : `Inputs.${type}`;
            })();
            const bracketify = (str: string) => `[${str}]`;
            return isList ? bracketify(importedType) : importedType;
          })(),
          conditionalResolve: (() => {
            const name = templateOpts.name;
            const value = `parent.${name}`;
            const stringParsefy = (str: string) => `String(${str})`;
            const final = shouldBeGraphqlId ? stringParsefy(value) : value;
            return final;
          })(),
        }),
      );
      return { fields, exportFields };
    },
    { fields: [] as string[], exportFields: [] as string[] },
  );
