import { firstLetterLowerCase, firstLetterUpperCase } from './string';

export interface TemplateVariables {
  name: string;
  value: string;
}

export const useTemplate = (template: string, variables: TemplateVariables) =>
  template
    .replace(/#{Name}/g, firstLetterUpperCase(variables.name))
    .replace(/#{name}/g, firstLetterLowerCase(variables.name))
    .replace(/#{value}/g, variables.value);
