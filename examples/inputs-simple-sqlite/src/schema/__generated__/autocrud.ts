import { builder } from '../builder';
import * as Objects from './objects';

type Model = Objects.Model;
const modelNames = Objects.modelNames;

type CrudOptions = { include: Model[], exclude?: never } | { exclude: Model[], include?: never };
const includeModel = (model: Model, opts?: CrudOptions): boolean => {
  if (!opts) return true;
  if (opts.include) return opts.include.includes(model);
  if (opts.exclude) return !opts.exclude.includes(model);
  return false;
};

export function generateAllObjects(opts?: CrudOptions) {
  const getParams = <T extends Model>(model: T): [T, any] => [model, Objects[`${model}Object`]];
  return modelNames
    .filter(md => includeModel(md, opts))
    .map(object => {
      const params = getParams(object)
      builder.prismaObject(...params); // Objects is all imports
    });
};

export function generateAllQueries(opts?: CrudOptions) {
  return modelNames
    .filter(md => includeModel(md, opts))
    .map(object => {
      builder.queryFields(Objects[`count${object}Query`]);
      builder.queryFields(Objects[`findFirst${object}Query`]);
      builder.queryFields(Objects[`findMany${object}Query`]);
      builder.queryFields(Objects[`findUnique${object}Query`]);
    });
};

export function generateAllMutations(opts?: CrudOptions) {
  return modelNames
    .filter(md => includeModel(md, opts))
    .map(object => {
      builder.mutationFields(Objects[`createMany${object}Mutation`]);
      builder.mutationFields(Objects[`createOne${object}Mutation`]);
      builder.mutationFields(Objects[`deleteMany${object}Mutation`]);
      builder.mutationFields(Objects[`deleteOne${object}Mutation`]);
      builder.mutationFields(Objects[`updateMany${object}Mutation`]);
      builder.mutationFields(Objects[`updateOne${object}Mutation`]);
      builder.mutationFields(Objects[`upsertOne${object}Mutation`]);
    });
};

export function generateAllCrud(opts?: CrudOptions) {
  generateAllObjects(opts);
  generateAllQueries(opts);
  generateAllMutations(opts);
};
