import { DMMF } from '@prisma/generator-helper';
import { firstLetterUpperCase } from '../../utils/string';
import { useTemplate } from '../../utils/template';
import {
  relationObjectTemplate,
  listRelationObjectTemplate,
  exposeObjectTemplate,
  fieldObjectTemplate,
} from '../templates/object';

const cleanifyDocumentation = (str?: string) => str?.replace(/\s*@Pothos\.omit\(.*\)\s*/, '');

export const getObjectFieldsString = (
  modelName: string,
  fields: DMMF.Field[],
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

      // Expose
      let expose: string | null = null;
      if (type === 'String' || type === 'Int' || type === 'Float' || type === 'Boolean')
        expose = type;
      if (isId) expose = 'ID';
      if (expose) {
        fields.push(`${name}: t.expose${expose}${isList ? 'List' : ''}('${name}', ${obj}),`);
        exportFields.push(useTemplate(exposeObjectTemplate, templateOpts));
        return { fields, exportFields };
      }

      // Relation
      if (relationName) {
        fields.push(`${name}: t.relation('${name}', ${obj}${isList ? '(t)' : ''}),`);
        if (isList) exportFields.push(useTemplate(listRelationObjectTemplate, templateOpts));
        else exportFields.push(useTemplate(relationObjectTemplate, templateOpts));
        return { fields, exportFields };
      }

      // Scalar (DateTime, Json, Enums, etc.)
      fields.push(`${name}: t.field(${obj}),`);
      exportFields.push(useTemplate(fieldObjectTemplate, templateOpts));
      return { fields, exportFields };
    },
    { fields: [] as string[], exportFields: [] as string[] },
  );
