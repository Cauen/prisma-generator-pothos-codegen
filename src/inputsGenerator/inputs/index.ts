import { DMMF } from '@prisma/generator-helper';
import { ConfigInternal } from '../../utils/config';
import { getMainInput } from './utils/dmmf';
import { parseComment } from './utils/parser';

/** Convert array of fields to string of fields */
const getFieldsString = (input: DMMF.InputType, model?: DMMF.Model): string => {
  // Description is parsed for @Pothos.omit() comments
  const omittedFieldNames: string[] = [];
  const filtered = input.fields.filter((field) => {
    const modelField = model?.fields.find((f) => f.name === field.name);
    if (!modelField || !modelField.documentation) return true;

    const omitTypes = parseComment(modelField.documentation);
    if (!omitTypes) return true;
    if (
      omitTypes === 'all' ||
      omitTypes.includes('input') ||
      omitTypes.some((omitType) =>
        input.name.startsWith(model?.name + omitType[0].toUpperCase() + omitType.slice(1)),
      )
    ) {
      omittedFieldNames.push(field.name);
      return false;
    }
    return true;
  });

  if (filtered.length === 0) return `_: t.field({ type: NEVER }),`;

  const fields = filtered.map((field) => {
    const { isList, type, location } = getMainInput().run(field.inputTypes);
    const props = { required: field.isRequired, description: undefined };
    const defaultScalarList = ['String', 'Int', 'Float', 'Boolean'];
    const isScalar = location === 'scalar' && defaultScalarList.includes(type.toString());

    const getScalar = () => {
      const parsedType = type; // TODO parse date to string ??
      const fieldType = isList ? `${parsedType}List` : parsedType.toString();
      // Format string from PascalCase to camelCase (e.g. IntList -> intList)
      const fLLower = (s: string) => s.replace(/./, (c) => c.toLowerCase());
      return `t.${fLLower(fieldType)}(${JSON.stringify(props)})`;
    };
    const getField = () => {
      // BigInt is reserved
      const renamedType = type === 'BigInt' ? 'Bigint' : type;
      const fieldType = isList ? `[${renamedType}]` : renamedType.toString();
      const relationProps = { ...props, type: fieldType };
      // "type":"CommentUncheckedCreateNestedManyWithoutAuthorInput"} -> "type":CommentUncheckedCreateNestedManyWithoutAuthorInput
      return `t.field(${JSON.stringify(relationProps).replace(/(type.+:)"(.+)"/, '$1$2')})`;
    };

    return `${field.name}: ${isScalar ? getScalar() : getField()},`;
  });
  const omittedFields = omittedFieldNames.map(
    (name) => `// Field '${name}' was omitted because of the @Pothos.omit command found in comment`,
  );
  const sep = '\n    ';

  return `${fields.join(sep)}${omittedFields.length > 0 ? sep : ''}${omittedFields.join(sep)}`;
};

export const getInputs = (config: ConfigInternal, dmmf: DMMF.Document) => {
  const inputStrings = dmmf.schema.inputObjectTypes.prisma
    // TODO make the generation of unchecked inputs configurable?
    // "Unchecked" inputs (that can be created using just an ID) are filtered out
    .filter(({ name }) => !name.includes('Unchecked'))
    .map((input) => {
      // Find the model related to the input type
      const model = dmmf.datamodel.models.find(({ name }) =>
        // TODO idk if all of these are necessary
        [
          'Where',
          'OrderBy',
          'ScalarWhere',
          'Update',
          'Create',
          'Upsert',
          'AvgOrderBy',
          'MaxOrderBy',
          'MinOrderBy',
          'SumOrderBy',
          'CountOrderBy',
          'Filter',
          'RelationFilter',
          'ListRelationFilter',
        ]
          .map((keyword) => name + keyword)
          .some((modelName) => input.name.startsWith(modelName)),
      );
      // if (!model) return `// ${input.name} was excluded because no corresponding model was found`;
      return `export const ${input.name} = builder.inputRef<Prisma.${input.name}>('${
        input.name
      }').implement({
  fields: (t) => ({
    ${getFieldsString(input, model)}
  })
})`;
    });

  return inputStrings.join('\n\n');
};
