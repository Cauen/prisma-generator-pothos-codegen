import { getSampleDMMF } from '../../tests/getPrismaSchema';
import { getDefaultConfig } from '../../utils/config';
import modelGenerate from '.';

describe('crudGenerator', () => {
  it('should files', async () => {
    const dmmf = await getSampleDMMF('complex');
    const defaultConfig = getDefaultConfig();
    const model = modelGenerate({
      config: { ...defaultConfig, crud: { ...defaultConfig.crud, outputDir: './generated/' } },
      dmmf,
      model: 'User',
    });
    expect(model.object).toBeTruthy();
  });
});
