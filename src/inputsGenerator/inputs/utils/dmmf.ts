import { DMMF } from '@prisma/generator-helper';

export type InputType = DMMF.SchemaArgInputType;
/**
 * Sometimes, input types is a list
 * But inputtypes from Graphql cannot be an Union
 * This function will find the main input type
 */
export function getMainInput() {
  // If one list, priorize it
  const priorizeJson = (inputs: InputType[]) => {
    const listInputs = inputs.find((el) => el.type === 'Json');
    if (listInputs) {
      return listInputs;
    }
    return undefined;
  };

  // If one list, priorize it
  const priorizeList = (inputs: InputType[]) => {
    const listInputs = inputs.filter((el) => el.isList);
    const exactlyOneIsList = listInputs.length === 1;
    if (exactlyOneIsList) {
      return listInputs[0];
    }
    return undefined;
  };

  // If not list, priorize not scalar
  const priorizeNotScalar = (inputs: InputType[]) => {
    const listInputs = inputs.filter((el) => el.isList);
    const exactlyOneIsList = listInputs.length === 0;
    if (exactlyOneIsList) {
      return inputs.find((el) => el.location !== 'scalar');
    }
    return undefined;
  };

  // If one list, priorize it
  const priorizeWhereInput = (inputs: InputType[]) => {
    const listInputs = inputs.find((el) => el.type.toString().includes('WhereInput'));
    if (listInputs) {
      return listInputs;
    }
    return undefined;
  };

  // If one list, priorize it
  const priorizeSetUpdateAlternative = (inputs: InputType[]) => {
    const setType = inputs.find((el) => el.type.toString().includes('FieldUpdateOperationsInput'));
    if (setType) {
      return setType;
    }
    return undefined;
  };

  const run = (inputs: InputType[]): InputType => {
    if (inputs.length === 0) throw new Error('No input type found');
    const first = inputs[0];
    const second = inputs[1];
    if (first && !second) return first;

    // ! ORDER MATTERS
    const isJsonPriority = priorizeJson(inputs);
    if (isJsonPriority) return isJsonPriority;

    const isListPriority = priorizeList(inputs);
    if (isListPriority) return isListPriority;

    const whereInputPriority = priorizeWhereInput(inputs);
    if (whereInputPriority) return whereInputPriority;

    const setUpdateAlternativePriority = priorizeSetUpdateAlternative(inputs);
    if (setUpdateAlternativePriority) return setUpdateAlternativePriority;

    const isNotScalarPriority = priorizeNotScalar(inputs);
    if (isNotScalarPriority) return isNotScalarPriority;

    return first;
  };

  return {
    run,
    priorizeJson,
    priorizeNotScalar,
    priorizeList,
    priorizeWhereInput,
    priorizeSetUpdateAlternative,
  };
}
