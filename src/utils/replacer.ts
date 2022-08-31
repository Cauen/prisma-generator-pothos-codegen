export type ReplacerPosition =
  | 'crud.model.object'
  | 'crud.model.index'
  | 'crud.model.resolver'
  | 'crud.model.resolverIndex'
  | 'crud.objects'
  | 'inputs';

export type Replacer = (generated: string, position: ReplacerPosition) => string;

export const defaultReplacer: Replacer = (str) => str;
