import { getSampleDMMF } from '../../../tests/getPrismaSchema';
import { writeResolvers } from '.';

describe('getObjectSrc', () => {
  it('should replace all variables', async () => {
    const dmmf = await getSampleDMMF('simple');
    const src = writeResolvers({
      configs: {},
      dmmf,
      model: 'User',
    });
    expect(src.hasQuery).toBeTruthy();
    expect(src.hasMutation).toBeTruthy();
    expect(src.writtenIndexes.mutationExports.includes(`export *`)).toBeTruthy();
    expect(src.writtenIndexes.queryExports.includes(`export *`)).toBeTruthy();
    expect(src.writtenResolvers.find((el) => el.includes('#{'))).toBeFalsy();
  });
});
