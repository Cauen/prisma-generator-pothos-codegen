import { replaceAndWriteFileSafely, writeFileSafely } from '../utils/filesystem'
import { DMMF } from '@prisma/generator-helper';
import { getScalars } from './pieces/scalars';
import { Config } from '../utils/config';
import { getImports } from './pieces/imports';
import { getEnums } from './pieces/enums';
import { getInputs } from './pieces/inputs';
import { envs } from '../envs';

export async function generateInputs(dmmf: DMMF.Document, config: Config): Promise<string> {
  // Debug logging
  if (envs.isTesting) writeFileSafely(JSON.stringify(dmmf, null, 2), 'dmmf.json')

  const imports = getImports(config)
  const scalars = getScalars({ dmmf, config })
  const enums = getEnums(dmmf)
  const inputs = getInputs({ dmmf, config })
  
  const text = [imports, '', scalars, '', enums, inputs].join('\n')

  const written = replaceAndWriteFileSafely(config, 'inputs')(text, config.inputs?.outputFilePath || './generated/inputs.ts')
  return written
}