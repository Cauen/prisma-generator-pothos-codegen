import { dmmf } from '@prisma/client';
import { debugLog, write } from './utils/filesystem'
import { fLLower } from "./utils/string";
import { DMMF } from '@prisma/generator-helper';
import { getMainInput } from './utils/dmmf';

export default async function generateInputs(dmmf: DMMF.Document): Promise<string> {
  console.log("GENERATING")
  const inputs = dmmf.schema.inputObjectTypes.prisma
  const enums = [...dmmf.schema.enumTypes.prisma, ...dmmf.datamodel.enums.map(el => ({ ...el, values: el.values.map(el => el.name) }))]

  await write(dmmf, 'dmmf.json')

  const header = `import { Prisma } from "../prisma/client"
import { builder } from "./builder"`
  const scalars = `const DateTime = builder.scalarType('DateTime', {
  serialize: (date) => new Date(date).toISOString(),
});
const Decimal = builder.scalarType('Decimal', {
  serialize: (date) => date,
});
const Bytes = builder.scalarType('Bytes', {
  serialize: (date) => date,
});
const Json = builder.scalarType('Json', {
  serialize: (date) => date,
});`
  const enumString = enums.map(el => {
    return `export const ${el.name} = builder.enumType('${el.name}', {
  values: ${JSON.stringify(el.values)} as const,
});`
  })
  const inputsString = inputs.map(input => {
    const inputName = input.name
    const fields = input.fields.map(field => {
      const props = { required: field.isRequired, description: undefined }
      const input = getMainInput().run(field.inputTypes)
      if (!field.inputTypes[0]?.isList && !field.inputTypes[1]?.isList) debugLog(field)
      const { isList, type, location } = input!
      const defaultScalarList = ['String', 'Int', 'Float', 'Boolean']
      const isScalar = location === "scalar" && defaultScalarList.includes(type.toString())

      const key = field.name
      const value = (() => {
        if (isScalar) {
          const parsedType = type // parse date to string ??
          const fieldType = isList ? `${parsedType}List` : parsedType.toString()
          return `t.${fLLower(fieldType)}(${JSON.stringify(props)})`
        } else {
          const removeQuotationMarksFromType = (str: string) => str.replace(/(type.+:)"(.+)"/, '$1$2')
          const fieldType = isList ? `[${type}]` : type.toString()
          const relationProps = { ...props, type: fieldType }
          // "type":"CommentUncheckedCreateNestedManyWithoutAuthorInput"} -> "type":CommentUncheckedCreateNestedManyWithoutAuthorInput}
          return `t.field(${removeQuotationMarksFromType(JSON.stringify(relationProps))})`
        }
      })()
      return `${key}: ${value},`
    }).join('\n    ')
    return `
export const ${inputName} = builder.inputRef<Prisma.${inputName}>('${inputName}').implement({
  fields: (t) => ({
    ${fields}
  })
})`
  })
  const text = [header, '', scalars, ...enumString, ...inputsString].join('\n')

  const written = await write(text)

  return written
}