import { dmmf } from '@prisma/client';
import { debugLog, write } from './utils/filesystem'
import { fLLower } from "./pieces/inputs/utils/string";
import { DMMF } from '@prisma/generator-helper';
import { getScalars } from './pieces/scalars';
import { Configs } from '../generator';
import { getImports } from './pieces/imports';
import { getEnums } from './pieces/enums';
import { getInputs } from './pieces/inputs';
import { envs } from './envs';

export default async function generateInputs(dmmf: DMMF.Document, configs: Configs): Promise<string> {
  if (envs.isTesting) {
    // debug propuse
    await write(dmmf, 'dmmf.json')
  }

  const imports = getImports(configs)
  const scalars = getScalars({ dmmf, configs })
  const enums = getEnums(dmmf)
  const inputs = getInputs(dmmf)
  
  const text = [imports, '', scalars, '', enums, inputs].join('\n')

  const written = await write(text, configs.output?.value)
  return written
}