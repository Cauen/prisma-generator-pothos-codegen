export type ReplacerSection =
  | 'crud.model.object'
  | 'crud.model.index'
  | 'crud.model.resolver'
  | 'crud.model.resolverIndex'
  | 'crud.objects'
  | 'crud.utils'
  | 'crud.autocrud'
  | 'inputs'
  | 'debug.log'
  | 'debug.dmmf'

export type Replacer<T extends string = ''> = (
  generated: string,
  section: keyof { [S in ReplacerSection as S extends `${T}${infer _}` ? S : never]: never },
) => string
