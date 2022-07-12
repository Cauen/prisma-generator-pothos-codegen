import generateInputs from '.';
import { getSampleDMMF } from '../../tests/getPrismaSchema';
import modelGenerate from '.'

describe('crudGenerator', () => {
  it('should files', async () => {
    const dmmf = await getSampleDMMF('complex')
    const model = modelGenerate({
      configs: {
        crud: {
          outputPath: "./generated/crud/"
        }
      },
      dmmf,
      model: "User"
    });
    expect(model.object).toBeTruthy();
  })
})
