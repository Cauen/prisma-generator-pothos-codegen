import type { DMMF } from '@prisma/generator-helper'

export type UsedScalars = {
  hasDateTime: boolean
  hasDecimal: boolean
  hasBytes: boolean
  hasJson: boolean
  hasBigInt: boolean
  hasNEVER: boolean
}

/** Reads the input types and returns what scalars are used */
export function getUsedScalars(inputs: DMMF.InputType[]): UsedScalars {
  let hasDateTime = false
  let hasDecimal = false
  let hasBytes = false
  let hasJson = false
  let hasBigInt = false
  let hasNEVER = false

  for (const { fields } of inputs) {
    if (fields.length === 0) hasNEVER = true
    for (const { inputTypes } of fields) {
      for (const { type, location } of inputTypes) {
        if (type === 'Json' && location === 'scalar') hasJson = true
        if (type === 'DateTime' && location === 'scalar') hasDateTime = true
        if (type === 'Decimal' && location === 'scalar') hasDecimal = true
        if (type === 'Bytes' && location === 'scalar') hasBytes = true
        if (type === 'BigInt' && location === 'scalar') hasBigInt = true
      }
    }
  }

  return { hasDateTime, hasDecimal, hasBytes, hasJson, hasBigInt, hasNEVER }
}

/** Find main input type (list or not, since GraphQL input types don't allow unions) */
export function getMainInput() {
  // If one list, priorize it
  const priorizeJson = (inputs: DMMF.InputTypeRef[]) => {
    const listInputs = inputs.find((el) => el.type === 'Json')
    if (listInputs) {
      return listInputs
    }
    return undefined
  }

  // If has list, priorize it
  const priorizeList = (inputs: DMMF.InputTypeRef[]) => {
    const listInputs = inputs.filter((el) => el.isList)
    const hasList = listInputs.length >= 1
    if (hasList) {
      return listInputs[0]
    }
    return undefined
  }

  // If not list, priorize not scalar
  const priorizeNotScalar = (inputs: DMMF.InputTypeRef[]) => {
    const listInputs = inputs.filter((el) => el.isList)
    const exactlyOneIsList = listInputs.length === 0
    if (exactlyOneIsList) {
      return inputs.find((el) => el.location !== 'scalar')
    }
    return undefined
  }

  // If one list, priorize it
  const priorizeWhereInput = (inputs: DMMF.InputTypeRef[]) => {
    const listInputs = inputs.find((el) => el.type.toString().includes('WhereInput'))
    if (listInputs) {
      return listInputs
    }
    return undefined
  }

  // If one list, priorize it
  const priorizeSetUpdateAlternative = (inputs: DMMF.InputTypeRef[]) => {
    const setType = inputs.find((el) => el.type.toString().includes('FieldUpdateOperationsInput'))
    if (setType) {
      return setType
    }
    return undefined
  }

  const run = (rawInputs: DMMF.InputTypeRef[]): DMMF.InputTypeRef => {
    // Ignore fieldRefTypes
    const inputs = rawInputs.filter((el) => el.location !== 'fieldRefTypes')

    const first = inputs[0]
    if (!first) throw new Error('No input type found')
    const second = inputs[1]
    if (first && !second) return first

    // ! ORDER MATTERS
    const isJsonPriority = priorizeJson(inputs)
    if (isJsonPriority) return isJsonPriority

    const isListPriority = priorizeList(inputs)
    if (isListPriority) return isListPriority

    const whereInputPriority = priorizeWhereInput(inputs)
    if (whereInputPriority) return whereInputPriority

    const setUpdateAlternativePriority = priorizeSetUpdateAlternative(inputs)
    if (setUpdateAlternativePriority) return setUpdateAlternativePriority

    const isNotScalarPriority = priorizeNotScalar(inputs)
    if (isNotScalarPriority) return isNotScalarPriority

    return first
  }

  return {
    run,
    priorizeJson,
    priorizeNotScalar,
    priorizeList,
    priorizeWhereInput,
    priorizeSetUpdateAlternative,
  }
}
