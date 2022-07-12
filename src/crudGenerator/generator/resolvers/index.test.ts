import { getSampleDMMF } from '../../../tests/getPrismaSchema';
import { writeResolvers } from '.'

describe('getObjectSrc', () => {
  it('should replace all variables', async () => {
    const dmmf = await getSampleDMMF('simple')
    const src = writeResolvers({
      configs: {},
      dmmf,
      model: "User"
    });
    expect(src.length > 1).toBeTruthy();
  })
})
