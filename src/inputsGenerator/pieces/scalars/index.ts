import { getUsedScalars, ScalarExportConfigs } from "./utils/dmmf"
import { DMMF } from '@prisma/generator-helper';
import { Configs } from "../../../generator";

const dateTimeScalar = `const DateTime = builder.scalarType('DateTime', {
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
});`

const decimalScalar = `const Decimal = builder.scalarType('Decimal', {
  serialize: (val) => (val),
  parseValue: (val) => Number(val),
});`

const bytesScalar = `const Bytes = builder.scalarType('Bytes', {
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
});`

const jsonScalar = `const Json = builder.scalarType('Json', {
  serialize: (value) => {
    return value
  },
});`

const bigIntScalar = `const Bigint = builder.scalarType('BigInt', {
  serialize: (val) => (val).toString(),
  parseValue: (val) => {
    if (typeof val !== 'string' && typeof val !== 'number') throw new Error("This is not parsable to bigint")
    return BigInt(val)
  },
});`

const neverScalar = `const NEVER = builder.scalarType('NEVER', {
  serialize: (value) => value,
  description: "Never fill this, its created for inputs that dont have fields"
});`

const getScalarsFromConfigs = (usedScalars: ScalarExportConfigs, excludeScalars?: string[]): string => {
  const isDatetimeExcluded = excludeScalars?.includes('DateTime')
  const isDecimalExcluded = excludeScalars?.includes('Decimal')
  const isBytesExcluded = excludeScalars?.includes('Bytes')
  const isJsonExcluded = excludeScalars?.includes('Json')
  const isBigIntExcluded = excludeScalars?.includes('BigInt')
  const isNeverExcluded = excludeScalars?.includes('NEVER')
  const scalars = [
    ...(usedScalars.hasDateTime && !isDatetimeExcluded ? [dateTimeScalar] : []),
    ...(usedScalars.hasDecimal && !isDecimalExcluded ? [decimalScalar] : []),
    ...(usedScalars.hasBytes && !isBytesExcluded ? [bytesScalar] : []),
    ...(usedScalars.hasJson && !isJsonExcluded ? [jsonScalar] : []),
    ...(usedScalars.hasBigInt && !isBigIntExcluded ? [bigIntScalar] : []),
    ...(usedScalars.hasNEVER && !isNeverExcluded ? [neverScalar] : []),
  ]
  return scalars.join('\n')
}

export const getScalars = ({ configs, dmmf }: { dmmf: DMMF.Document, configs: Configs }) => {
  const inputs = dmmf.schema.inputObjectTypes.prisma
  const used = getUsedScalars(inputs)
  const { excludeScalars } = configs
  return getScalarsFromConfigs(used, excludeScalars)
}