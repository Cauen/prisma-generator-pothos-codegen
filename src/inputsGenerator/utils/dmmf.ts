import { DMMF } from '@prisma/generator-helper';

export type InputType = DMMF.SchemaArgInputType
/**
 * Sometimes, input types is a list
 * But inputtypes from Graphql cannot be an Union
 * This function will find the main input type
 */
export function getMainInput() {
  // If one list, priorize it
  const priorizeJson = (inputs: InputType[]) => {
    const listInputs = inputs.find(el => el.type === "Json")
    if (listInputs) {
      return listInputs
    }
    return undefined
  }

  // If one list, priorize it
  const priorizeList = (inputs: InputType[]) => {
    const listInputs = inputs.filter(el => el.isList)
    const exactlyOneIsList = listInputs.length === 1
    if (exactlyOneIsList) {
      return listInputs[0]
    }
    return undefined
  }

  // If not list, priorize not scalar
  const priorizeNotScalar = (inputs: InputType[]) => {
    const listInputs = inputs.filter(el => el.isList)
    const exactlyOneIsList = listInputs.length === 0
    if (exactlyOneIsList) {
      return inputs.find(el => el.location !== 'scalar')
    }
    return undefined
  }

  const run = (inputs: InputType[]): InputType => {
    if (inputs.length === 0) throw new Error('No input type found')
    const first = inputs[0]!
    const second = inputs[1]
    if (first && !second) return first

    const isJsonPriority = priorizeJson(inputs)
    if (isJsonPriority) return isJsonPriority

    const isListPriority = priorizeList(inputs)
    if (isListPriority) return isListPriority

    const isNotScalarPriority = priorizeNotScalar(inputs)
    if (isNotScalarPriority) return isNotScalarPriority

    return first
  }

  return {
    run,
    priorizeJson,
    priorizeNotScalar,
    priorizeList,
  }
}


export type ScalarExportConfigs = {
  hasDateTime: boolean;
  hasDecimal: boolean;
  hasBytes: boolean;
  hasJson: boolean;
  hasBigInt: boolean;
  hasNEVER: boolean;
}

/**
 * Reads the input types and return what scalars are used
 */
export function getUsedScalars(inputs: DMMF.InputType[]): ScalarExportConfigs {
  let hasDateTime = false
  let hasDecimal = false
  let hasBytes = false
  let hasJson = false
  let hasBigInt = false
  let hasNEVER = false

  for (const input of inputs) {
    const { fields } = input
    if (input.fields.length === 0) hasNEVER = true
    for (const field of fields) {
      const { inputTypes } = field
      for (const inputType of inputTypes) {
        const { location, type } = inputType
        if (type === "Json" && location === "scalar") hasJson = true
        if (type === "DateTime" && location === "scalar") hasDateTime = true
        if (type === "Decimal" && location === "scalar") hasDecimal = true
        if (type === "Bytes" && location === "scalar") hasBytes = true
        if (type === "BigInt" && location === "scalar") hasBigInt = true
      }
    }
  }

  return {
    hasDateTime,
    hasDecimal,
    hasBytes,
    hasJson,
    hasBigInt,
    hasNEVER,
  }
}