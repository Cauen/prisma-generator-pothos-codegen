import { getSampleDMMF } from '../../tests/getPrismaSchema';
import generateInputs from '.';
import modelGenerate from '.';

describe('crudGenerator', () => {
  it('should files', async () => {
    const dmmf = await getSampleDMMF('complex');
    const model = modelGenerate({
      configs: {
        crud: {
          outputFolderPath: './generated/',
        },
      },
      dmmf,
      model: 'User',
    });
    expect(model.object).toBeTruthy();
  });
});
