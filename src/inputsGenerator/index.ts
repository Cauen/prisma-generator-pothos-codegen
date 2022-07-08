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
  parseValue(value) {
    const isDateParsable = typeof value === 'string' || typeof value === 'number'
    if (!isDateParsable) throw new Error("DateTime input date")
    const date = new Date(value)
    const isInvalidDate = date.toString() === 'Invalid Date'
    if (isInvalidDate) throw new Error("Invalid input date")
    return new Date(value)
  },
  serialize(value) {
    return value ? new Date(value) : null;
  },
});

const Decimal = builder.scalarType('Decimal', {
  serialize: (val) => (val),
  parseValue: (val) => Number(val),
});

const Bytes = builder.scalarType('Bytes', {
  serialize: (value) => {
    return value
  },
  parseValue: value => {
    // check type to know how to parse
    if (Array.isArray(value)) {
      return Buffer.from(value)
    }
    if (typeof value === "string") {
      return Buffer.from(value, 'utf8')
    }

    throw new Error("Bytes must be string or array")
  }
});

const Json = builder.scalarType('Json', {
  serialize: (value) => {
    return value
  },
});

const Bigint = builder.scalarType('BigInt', {
  serialize: (val) => (val).toString(),
  parseValue: (val) => {
    if (typeof val !== 'string' && typeof val !== 'number') throw new Error("This is not parsable to bigint")
    return BigInt(val)
  },
});

const NEVER = builder.scalarType('NEVER', {
  serialize: (value) => value,
  description: "Never fill this, its created for inputs that dont have fields"
});`
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

  const written = await write(text)

  return written
}