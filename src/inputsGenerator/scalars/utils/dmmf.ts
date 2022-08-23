import { DMMF } from '@prisma/generator-helper';

export type ScalarExportConfigs = {
  hasDateTime: boolean;
  hasDecimal: boolean;
  hasBytes: boolean;
  hasJson: boolean;
  hasBigInt: boolean;
  hasNEVER: boolean;
};

/**
 * Reads the input types and return what scalars are used
 */
export function getUsedScalars(inputs: DMMF.InputType[]): ScalarExportConfigs {
  let hasDateTime = false;
  let hasDecimal = false;
  let hasBytes = false;
  let hasJson = false;
  let hasBigInt = false;
  let hasNEVER = false;

  for (const input of inputs) {
    const { fields } = input;
    if (input.fields.length === 0) hasNEVER = true;
    for (const field of fields) {
      const { inputTypes } = field;
      for (const inputType of inputTypes) {
        const { location, type } = inputType;
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
