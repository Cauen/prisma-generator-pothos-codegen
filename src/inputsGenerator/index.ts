import { dmmf } from '@prisma/client';
import { debugLog, writeFileSafely } from '../utils/filesystem'
import { fLLower } from "./pieces/inputs/utils/string";
import { DMMF } from '@prisma/generator-helper';
import { getScalars } from './pieces/scalars';
import { Configs } from '../generator';
import { getImports } from './pieces/imports';
import { getEnums } from './pieces/enums';
import { getInputs } from './pieces/inputs';
import { envs } from '../envs';

export default async function generateInputs(dmmf: DMMF.Document, configs: Configs): Promise<string> {
  if (envs.isTesting) {
    // debug propuse
    writeFileSafely(JSON.stringify(dmmf, null, 2), 'dmmf.json')
  }

  const imports = getImports(configs)
  const scalars = getScalars({ dmmf, configs })
  const enums = getEnums(dmmf)
  const inputs = getInputs({ dmmf, configs })
  
  const text = [imports, '', scalars, '', enums, inputs].join('\n')

  const written = writeFileSafely(text, configs.output?.value || './generated/inputs.ts')
  return written
}