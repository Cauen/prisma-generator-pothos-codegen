import { dmmf } from '@prisma/client';
import { debugLog, replaceAndWriteFileSafely, writeFileSafely } from '../utils/filesystem'
import { fLLower } from "./pieces/inputs/utils/string";
import { DMMF } from '@prisma/generator-helper';
import { getScalars } from './pieces/scalars';
import { Configs } from '../generator';
import { getImports } from './pieces/imports';
import { getEnums } from './pieces/enums';
import { getInputs } from './pieces/inputs';
import { envs } from '../envs';

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname +  '/dmmf.json', {flags : 'w'});
// var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
};

export default async function generateInputs(dmmf: DMMF.Document, configs: Configs): Promise<string> {
  if (true) {
    // debug propuse
    console.log(JSON.stringify(dmmf, null, 2))
  }

  const imports = getImports(configs)
  const scalars = getScalars({ dmmf, configs })
  const enums = getEnums(dmmf)
  const inputs = getInputs({ dmmf, configs })
  
  const text = [imports, '', scalars, '', enums, inputs].join('\n')

  const written = replaceAndWriteFileSafely(configs, 'inputs')(text, configs.inputs?.outputFilePath || './generated/inputs.ts')
  return written
}