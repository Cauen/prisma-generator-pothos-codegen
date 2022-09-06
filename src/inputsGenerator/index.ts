import { DMMF } from '@prisma/generator-helper';
import { env } from '../env';
import { ConfigInternal } from '../utils/config';
import { writeFile } from '../utils/filesystem';
import { getEnums, getImports, getScalars, getInputs } from './utils/parts';

/** Types may vary between Prisma versions */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Scalars<DecimalType = number, JsonInput = any, JsonOutput = any> = {
  DateTime: {
    Input: Date;
    Output: Date;
  };
  Decimal: {
    Input: DecimalType;
    Output: DecimalType;
  };
  BigInt: {
    Input: bigint;
    Output: bigint;
  };
  Json: {
    Input: JsonInput;
    Output: JsonOutput;
  };
  Bytes: {
    Input: Buffer;
    Output: {
      type: 'Buffer';
      data: number[];
    };
  };
  NEVER: {
    Input: void;
    Output: void;
  };
};

export async function generateInputs(config: ConfigInternal, dmmf: DMMF.Document): Promise<void> {
  if (env.isTesting) writeFile(config, 'debug.dmmf', JSON.stringify(dmmf, null, 2), 'dmmf.json');

  const imports = getImports(config);
  const scalars = getScalars(config, dmmf);
  const enums = getEnums(dmmf);
  const inputs = getInputs(dmmf);
  const content = [imports, scalars, enums, inputs].join('\n\n');

  await writeFile(config, 'inputs', content, config.inputs.outputFilePath);
}
