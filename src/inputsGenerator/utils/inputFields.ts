import { DMMF } from '@prisma/generator-helper';
import { firstLetterLowerCase, firstLetterUpperCase } from '../../utils/string';
import { getMainInput } from './dmmf';
import { parseComment } from './parser';

/** Convert array of fields to a string code representation */
export const getFieldsString = (input: DMMF.InputType, model?: DMMF.Model): string => {
  const omittedNames: string[] = [];

  // Description is parsed for @Pothos.omit() comments and input fields are filtered
  const filtered = input.fields.filter((field) => {
    const modelField = model?.fields.find((f) => f.name === field.name);
    if (!modelField || !modelField.documentation) return true;

    const omitTypes = parseComment(modelField.documentation);
    if (!omitTypes) return true;
    if (
      omitTypes === 'all' ||
      omitTypes.some((omitType) =>
        input.name.startsWith(model?.name + firstLetterUpperCase(omitType)),
      )
    ) {
      omittedNames.push(field.name);
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

          const getScalar = () => {
            // TODO parse date to string ??
            const fieldType = isList ? `${type}List` : type.toString();
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

  const sep = '\n    ';
  return `${fields.join(sep)}${omittedNames.length > 0 ? sep : ''}${omittedNames
    .map((name) => `// '${name}' was omitted by @Pothos.omit found in schema comment`)
    .join(sep)}`;
};
