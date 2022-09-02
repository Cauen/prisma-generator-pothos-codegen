type Variables<T extends string> = T extends `${infer _}#{${infer VarName}}${infer Tail}`
  ? VarName | Variables<Tail>
  : never;

export const useTemplate = <T extends string, S extends Variables<T>>(
  template: T,
  variables: Omit<{ [V in Variables<T>]: string }, S>,
  skip?: S[],
): string => {
  let newTemplate: string = template;
  Object.entries(variables).forEach(([name, value]) => {
    if (!skip?.includes(name as S))
      newTemplate = newTemplate.replace(new RegExp(`#{${name}}`, 'g'), value as string);
  });
  return newTemplate;
};
