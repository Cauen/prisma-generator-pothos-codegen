import { DMMF } from '@prisma/generator-helper';
import { firstLetterLowerCase, firstLetterUpperCase } from '../../utils/string';
import { getMainInput } from './dmmf';
import { parseComment } from './parser';

/** Convert array of fields to a string code representation */
export const getInputFieldsString = (
  input: DMMF.InputType,
  model?: DMMF.Model,
  simple?: boolean,
): string => {
  const omitted: { name: string; reason: string }[] = [];

  const filtered = input.fields.filter((field) => {
    // Fields are filtered for simple mode if this is enabled
    if (
      simple &&
      [
        'create',
        'connectOrCreate',
        'createMany',
        'upsert',
        'update',
        'updateMany',
        'delete',
        'deleteMany',
      ].includes(field.name)
    ) {
      omitted.push({ name: field.name, reason: '`simple mode: true` found in global config' });
      return false;
    }

    // Description is parsed for @Pothos.omit() comments and input fields are filtered
    const modelField = model?.fields.find((f) => f.name === field.name);

    if (!modelField || !modelField.documentation) return true;

    const omitTypes = parseComment(modelField.documentation);

    if (!omitTypes) return true;
    if (
      omitTypes === 'all' ||
      omitTypes.some(
        (omitType) =>
          input.name.startsWith(`${model?.name}${firstLetterUpperCase(omitType)}`) ||
          input.name.startsWith(`${model?.name}Unchecked${firstLetterUpperCase(omitType)}`),
      )
    ) {
      omitted.push({ name: field.name, reason: '@Pothos.omit found in schema comment' });
      return false;
    }

    return true;
  });

  // Convert remaining fields to string representation
  const fields =
    filtered.length === 0
      ? ['_: t.field({ type: NEVER }),']
      : filtered.map((field) => {
          const { isList, type, location } = getMainInput().run(field.inputTypes);
          const props = { required: field.isRequired, description: undefined };

          const getFieldType = () => {
            const fieldDetails = model?.fields.find((f) => f.name === field.name);
            if (isList) {
              return `${type}List`;
            }
            if (
              (fieldDetails?.type === 'String' || fieldDetails?.type === 'Int') &&
              fieldDetails?.isId
            ) {
              return 'id';
            }
            return type.toString();
          };

          const getScalar = () => {
            // TODO parse date to string ??
            const fieldType = getFieldType();
            return `${firstLetterLowerCase(fieldType)}(${JSON.stringify(props)})`;
          };

          const getField = () => {
            // BigInt is reserved
            const renamedType = type === 'BigInt' ? 'Bigint' : type;
            const fieldType = isList ? `[${renamedType}]` : renamedType.toString();
            const relationProps = { ...props, type: fieldType };
            // "type":"CommentCreateInput" -> "type":CommentCreateInput
            return `field(${JSON.stringify(relationProps).replace(/(type.+:)"(.+)"/, '$1$2')})`;
          };

          const defaultScalarList = ['String', 'Int', 'Float', 'Boolean'];
          const isScalar = location === 'scalar' && defaultScalarList.includes(type.toString());

          return `${field.name}: t.${isScalar ? getScalar() : getField()},`;
        });

  const sep = '\n  ';
  return `${fields.join(sep)}${omitted.length > 0 ? sep : ''}${omitted
    .map((o) => `// '${o.name}' was omitted due to ${o.reason}`)
    .join(sep)}`;
};
