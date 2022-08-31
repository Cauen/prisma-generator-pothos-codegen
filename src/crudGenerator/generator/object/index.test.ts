import { getSampleDMMF } from '../../../tests/getPrismaSchema';
import { getDefaultConfig } from '../../../utils/config';
import { getObjectSrc } from '.';

describe('getObjectSrc', () => {
  it('should replace all variables', async () => {
    const dmmf = await getSampleDMMF('simple');
    const defaultConfig = getDefaultConfig();
    const src = getObjectSrc({
      config: defaultConfig,
      dmmf,
      model: 'User',
    });
    expect(src.includes('#{')).toBeFalsy();
    expect(src.includes('description: undefined')).toBeTruthy();
    expect(src.includes('findUnique: ({ id }) => ({ id }),')).toBeTruthy();
    expect(src.includes("id: t.exposeID('id'")).toBeTruthy();
  });
});
