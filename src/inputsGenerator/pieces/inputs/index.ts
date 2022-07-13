import { getMainInput } from "./utils/dmmf"
import { fLLower } from "./utils/string"
import { DMMF } from '@prisma/generator-helper';
import { Configs } from "../../../generator";

export const getInputs = ({ dmmf, configs }: { dmmf: DMMF.Document, configs: Configs }) => {
  const inputs = dmmf.schema.inputObjectTypes.prisma
  const excludeInputs = configs.inputs?.excludeInputs

  // Unchecked is inputs that can create with ID number
  // Its dont used
  const inputsStrings = inputs.filter(el => !el.name.includes("Unchecked")).map(input => {
    const inputName = input.name
    if (excludeInputs?.includes(inputName)) {
      return `// ${inputName} was excluded from configs.excludeInputs`
    }

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

  return inputsStrings.join('\n')
}