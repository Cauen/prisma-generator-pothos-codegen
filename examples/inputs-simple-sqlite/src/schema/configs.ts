import { ConfigsOptions } from '../../../../src'

export const configs: ConfigsOptions = {
  crud: {
    inputsImporter: "import * as Inputs from \"@/schema/inputs\";",
    builderImporter: "import { builder } from \"@/schema/builder\";",
    outputFolderPath: "./src/schema/",
    // replacer(generated, position) {
    //   return `// THIS CONTENT WAS INSERTED AT REPLACE. THE POSITION IS ${position}\n${generated}`
    // },
  },
  inputs: {
    prismaImporter: "import { Prisma } from \".prisma/client\";",
    outputFilePath: "./src/schema/inputs.ts"
  }
}