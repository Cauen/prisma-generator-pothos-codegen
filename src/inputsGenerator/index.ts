import { DMMF } from '@prisma/generator-helper';
import { env } from '../env';
import { ConfigInternal } from '../utils/config';
import { replaceAndWriteFileSafely, writeFileSafely } from '../utils/filesystem';
import { getEnums } from './enums';
import { getImports } from './imports';
import { getInputs } from './inputs';
import { getScalars } from './scalars';

export async function generateInputs(dmmf: DMMF.Document, config: ConfigInternal): Promise<string> {
  if (env.isTesting) writeFileSafely(JSON.stringify(dmmf, null, 2), 'dmmf.json');

  const imports = getImports(config);
  const scalars = getScalars(config, dmmf);
  const enums = getEnums(dmmf);
  const inputs = getInputs(config, dmmf);

  const text = [imports, scalars, enums, inputs].join('\n\n');

  const written = replaceAndWriteFileSafely(config, 'inputs')(
    text,
    config.inputs?.outputFilePath || './generated/inputs.ts',
  );
  return written;
}
