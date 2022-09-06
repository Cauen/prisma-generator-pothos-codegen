import { getSampleDMMF } from '../tests/getPrismaSchema';
import { getDefaultConfig } from '../utils/config';
import { generateInputs } from '.';

describe('inputsGenerator', () => {
  it('should generate inputs', async () => {
    const dmmf = await getSampleDMMF('complex');
    const defaultConfig = getDefaultConfig();
    await generateInputs(defaultConfig, dmmf);
  });
});
