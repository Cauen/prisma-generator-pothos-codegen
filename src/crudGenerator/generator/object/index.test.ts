import { getSampleDMMF } from '../../../tests/getPrismaSchema';
import { getObjectSrc } from '.'

describe('getObjectSrc', () => {
  it('should replace all variables', async () => {
    const dmmf = await getSampleDMMF('simple')
    const src = getObjectSrc({
      configs: {},
      dmmf,
      model: "User"
    });
    expect(src.includes("#{")).toBeFalsy();
    expect(src.includes("description: undefined")).toBeTruthy();
    expect(src.includes("findUnique: ({ id }) => ({ id }),")).toBeTruthy();
    expect(src.includes("id: t.exposeID('id'")).toBeTruthy();
  })
})
