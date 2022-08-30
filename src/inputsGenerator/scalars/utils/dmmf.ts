import { DMMF } from '@prisma/generator-helper';

export type UsedScalars = {
  hasDateTime: boolean;
  hasDecimal: boolean;
  hasBytes: boolean;
  hasJson: boolean;
  hasBigInt: boolean;
  hasNEVER: boolean;
};

/** Reads the input types and returns what scalars are used */
export function getUsedScalars(inputs: DMMF.InputType[]): UsedScalars {
  let hasDateTime = false;
  let hasDecimal = false;
  let hasBytes = false;
  let hasJson = false;
  let hasBigInt = false;
  let hasNEVER = false;

  for (const { fields } of inputs) {
    if (fields.length === 0) hasNEVER = true;
    for (const { inputTypes } of fields) {
      for (const { type, location } of inputTypes) {
        if (type === 'Json' && location === 'scalar') hasJson = true;
        if (type === 'DateTime' && location === 'scalar') hasDateTime = true;
        if (type === 'Decimal' && location === 'scalar') hasDecimal = true;
        if (type === 'Bytes' && location === 'scalar') hasBytes = true;
        if (type === 'BigInt' && location === 'scalar') hasBigInt = true;
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
  };
}
