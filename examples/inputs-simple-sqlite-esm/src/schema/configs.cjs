// /** @type {import('prisma-generator-pothos-codegen').Config} */

const fs = require("fs")
const path = require("path")

/** @type {import('../../../../src').Config} */
module.exports = {
  crud: {
    outputDir: './src/schema/__generated__/',
    // replacer(generated, position) {
    //   return `// THIS CONTENT WAS INSERTED AT REPLACE. THE POSITION IS ${position}\n${generated}`
    // },
    excludeResolversContain: ["User"],
    prismaCaller: '_context.db',
    disabled: false,
    inputsImporter: "import * as Inputs from '../inputs.js';",
    deleteOutputDirBeforeGenerate: true,
    exportEverythingInObjectsDotTs: false,
    prismaImporter: `import { Prisma } from '@prisma/client';`,
  },
  inputs: {
    prismaImporter: `import { Prisma } from '@prisma/client';`,
    outputFilePath: './src/schema/__generated__/inputs.ts',
    simple: true,
  },
  global: {
    builderLocation: "./src/schema/builder",
    // replacer: (str, section) => {
    //   if (section === 'crud.model.resolver') {
    //     return str.replace(
    //       "import * as Inputs from '../inputs'",
    //       "import * as Inputs from '../../inputs';",
    //     );
    //   }
    //   return str;
    // },
    afterGenerate: (dmmf) => {
      fs.writeFile(
        path.join(__dirname, `./dmmf.json`),
        JSON.stringify(dmmf, null, 2),
        {},
        (err) => {
          console.log({ err });
        }
      );
    }
  },
};
