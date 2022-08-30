import { DMMF } from '@prisma/generator-helper';
import { ConfigInternal } from '../../utils/config';
import { getMainInput } from './utils/dmmf';

/** Format string from PascalCase to camelCase (e.g. IntList -> intList) */
const fLLower = (s: string) => s.replace(/./, (c) => c.toLowerCase());

type OmitType = 'all' | ('input' | 'output' | 'create' | 'update')[];
const omitTypes: OmitType = ['input', 'output', 'create', 'update'];

/** Parses comment for omit commands in the following syntax:
 * /// @Pothos.omit() # Omits field from all inputs and output
 * /// @Pothos.omit(output, create) # Omits field from the output and the create input
 * /// @Pothos.omit(input) # Omits field from all inputs
 */
const parseComment = (s: string): OmitType => {
  const start = '/// @Pothos.omit(';

  if (s[s.indexOf(start) + start.length] === ')') return 'all';
  while (true) {
    break;
  }
};

/** Convert array of fields to string of fields */
const getFieldsString = (inputFields: DMMF.SchemaArg[], modelFields: DMMF.Field[]): string => {
  if (inputFields.length === 0) return `_: t.field({ type: NEVER }),`;
  return (
    inputFields
      // Description is parsed for @Pothos.omit() comments
      .filter((field) => {
        const modelField = modelFields.find((f) => f.name === field.name);
      })
      .map((field) => {})
      .join('\n    ')
  );

  // const props = { required: field.isRequired, description: undefined };
  // const input = getMainInput().run(field.inputTypes);
  // const { isList, type, location } = input!;
  // const defaultScalarList = ['String', 'Int', 'Float', 'Boolean'];
  // const isScalar = location === 'scalar' && defaultScalarList.includes(type.toString());

  // const key = field.name;
  // const value = (() => {
  //   if (isScalar) {
  //     const parsedType = type; // parse date to string ??
  //     const fieldType = isList ? `${parsedType}List` : parsedType.toString();
  //     return `t.${fLLower(fieldType)}(${JSON.stringify(props)})`;
  //   } else {
  //     const removeQuotationMarksFromType = (str: string) => str.replace(/(type.+:)"(.+)"/, '$1$2');
  //     const renamedType = (() => {
  //       if (type === 'BigInt') return 'Bigint'; // BigInt is reserved
  //       return type;
  //     })();
  //     const fieldType = isList ? `[${renamedType}]` : renamedType.toString();
  //     const relationProps = { ...props, type: fieldType };
  //     // "type":"CommentUncheckedCreateNestedManyWithoutAuthorInput"} -> "type":CommentUncheckedCreateNestedManyWithoutAuthorInput
  //     return `t.field(${removeQuotationMarksFromType(JSON.stringify(relationProps))})`;
  //   }
  // })();
  // return `${key}: ${value},`;
};

export const getInputs = (config: ConfigInternal, dmmf: DMMF.Document) => {
  const inputStrings = dmmf.schema.inputObjectTypes.prisma
    // TODO make the generation of unchecked inputs configurable?
    // "Unchecked" inputs (that can be created using just an ID) are filtered out
    .filter(({ name }) => !name.includes('Unchecked'))
    .map((input) => {
      const model = dmmf.datamodel.models.find((el) => input.name.includes(el.name));
      if (!model) return `// ${input.name} was excluded because no corresponding model was found`;
      return `
  export const ${input.name} = builder.inputRef<Prisma.${input.name}>('${input.name}').implement({
    fields: (t) => ({
      ${getFieldsString(input.fields, model.fields)}
    })
  })`;
    });

  return inputStrings.join('\n');
};
