import { Config } from '../../../utils/config';

export const getImports = (config: Config) => {
  const prismaImporter = config.inputs?.prismaImporter || `import { Prisma } from ".prisma/client"`;
  const builderImporter = config.inputs?.builderImporter || `import { builder } from "./builder"`;
  return [prismaImporter, builderImporter].join('\n');
};
