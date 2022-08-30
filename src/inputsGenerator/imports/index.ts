import { ConfigInternal } from '../../utils/config';

export const getImports = (config: ConfigInternal) =>
  [config.inputs.prismaImporter, config.inputs.builderImporter].join('\n');
