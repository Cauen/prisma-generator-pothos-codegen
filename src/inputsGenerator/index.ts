import { env } from '../env'
import { ConfigInternal } from '../utils/config'
import { writeFile } from '../utils/filesystem'
import { getEnums, getImports, getScalars, getInputs, getUtil } from './utils/parts'
import type { DMMF } from '@prisma/generator-helper'

/** Types may vary between Prisma versions */
export type Scalars<DecimalType, JsonInput, JsonOutput> = {
  DateTime: {
    Input: Date
    Output: Date
  }
  Decimal: {
    Input: DecimalType
    Output: DecimalType
  }
  BigInt: {
    Input: bigint
    Output: bigint
  }
  Json: {
    Input: JsonInput
    Output: JsonOutput
  }
  Bytes: {
    Input: Buffer
    Output: {
      type: 'Buffer'
      data: number[]
    }
  }
  NEVER: {
    Input: void
    Output: void
  }
}

export async function generateInputs(config: ConfigInternal, dmmf: DMMF.Document): Promise<void> {
  if (env.isTesting) await writeFile(config, 'debug.dmmf', JSON.stringify(dmmf, null, 2), 'dmmf.json')

  const fileLocation = config.inputs.outputFilePath

  const imports = getImports(config, fileLocation)
  const util = getUtil()
  const scalars = getScalars(config, dmmf)
  const enums = getEnums(dmmf)
  const inputs = getInputs(config, dmmf)
  const content = [imports, util, scalars, enums, inputs].join('\n\n')

  await writeFile(config, 'inputs', content, fileLocation)
}
