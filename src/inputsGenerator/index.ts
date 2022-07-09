import { dmmf } from '@prisma/client';
import { debugLog, write } from './utils/filesystem'
import { fLLower } from "./utils/string";
import { DMMF } from '@prisma/generator-helper';
import { getMainInput, getUsedScalars } from './utils/dmmf';
import { getScalarsFromConfigs } from './scalars';
import { Configs } from '..';

export default async function generateInputs(dmmf: DMMF.Document, configs: Configs): Promise<string> {
  const inputs = dmmf.schema.inputObjectTypes.prisma
  const enums = [...dmmf.schema.enumTypes.prisma, ...dmmf.datamodel.enums.map(el => ({ ...el, values: el.values.map(el => el.name) }))]

  await write(dmmf, 'dmmf.json')

  const header = `${configs.inputsPrismaImporter || `import { Prisma } from ".prisma/client"`}
${configs.inputsBuilderImporter || `import { builder } from "./builder"`}`
  const exportedScalars = getUsedScalars(dmmf.schema.inputObjectTypes.prisma)
  const scalars = getScalarsFromConfigs(exportedScalars)
  const enumString = enums.map(el => {
    return `export const ${el.name} = builder.enumType('${el.name}', {
  values: ${JSON.stringify(el.values)} as const,
});`
  })
  const inputsString = inputs.map(input => {
    const inputName = input.name
    const fields = (() => {
      if (!input.fields.length) return `_: t.field({type: NEVER}),`
      const fieldsString = input.fields.map(field => {
        const props = { required: field.isRequired, description: undefined }
        const input = getMainInput().run(field.inputTypes)
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
            const renamedType = (() => {
              if (type === "BigInt") return "Bigint" // BigInt is reserved
              return type
            })()
            const fieldType = isList ? `[${renamedType}]` : renamedType.toString()
            const relationProps = { ...props, type: fieldType }
            // "type":"CommentUncheckedCreateNestedManyWithoutAuthorInput"} -> "type":CommentUncheckedCreateNestedManyWithoutAuthorInput}
            return `t.field(${removeQuotationMarksFromType(JSON.stringify(relationProps))})`
          }
        })()
        return `${key}: ${value},`
      }).join('\n    ')
      return fieldsString
    })()
    return `
export const ${inputName} = builder.inputRef<Prisma.${inputName}>('${inputName}').implement({
  fields: (t) => ({
    ${fields}
  })
})`
  })
  const text = [header, '', scalars, '', ...enumString, ...inputsString].join('\n')

  const written = await write(text, configs.output?.value)

  return written
}