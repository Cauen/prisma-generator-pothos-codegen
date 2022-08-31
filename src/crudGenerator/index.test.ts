import { getSampleDMMF } from '../tests/getPrismaSchema';
import { getDefaultConfig } from '../utils/config';
import { generateCrud } from '.';

describe('crudGenerator', () => {
  it('should generate all files', async () => {
    const dmmf = await getSampleDMMF('complex');
    const defaultConfig = getDefaultConfig();
    const inputs = await generateCrud(dmmf, defaultConfig);
    expect(inputs).toBeTruthy();
  });
});
