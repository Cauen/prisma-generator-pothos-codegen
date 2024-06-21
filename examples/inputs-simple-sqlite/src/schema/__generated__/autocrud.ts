import * as User from './User';
import * as UserLast from './UserLast';
import * as Post from './Post';
import * as ExtraModal from './ExtraModal';
import * as Comment from './Comment';
import * as Profile from './Profile';
import * as Follow from './Follow';
import * as Unrelated from './Unrelated';
import * as IdOnly from './IdOnly';
import * as WithoutID from './WithoutID';
import * as WithScalars from './WithScalars';
import { builder } from '../builder';
import * as Objects from './objects';

type Model = Objects.Model;

export const Cruds: Record<
  Objects.Model,
  {
    Object: any;
    queries: Record<string, Function>;
    mutations: Record<string, Function>;
  }
> = {
  User: {
    Object: User.UserObject,
    queries: {
      findFirst: User.findFirstUserQueryObject,
      findMany: User.findManyUserQueryObject,
      count: User.countUserQueryObject,
      findUnique: User.findUniqueUserQueryObject,
    },
    mutations: {
      createMany: User.createManyUserMutationObject,
      createOne: User.createOneUserMutationObject,
      deleteMany: User.deleteManyUserMutationObject,
      deleteOne: User.deleteOneUserMutationObject,
      updateMany: User.updateManyUserMutationObject,
      updateOne: User.updateOneUserMutationObject,
      upsertOne: User.upsertOneUserMutationObject,
    },
  },
  UserLast: {
    Object: UserLast.UserLastObject,
    queries: {
      findFirst: UserLast.findFirstUserLastQueryObject,
      findMany: UserLast.findManyUserLastQueryObject,
      count: UserLast.countUserLastQueryObject,
      findUnique: UserLast.findUniqueUserLastQueryObject,
    },
    mutations: {
      createMany: UserLast.createManyUserLastMutationObject,
      createOne: UserLast.createOneUserLastMutationObject,
      deleteMany: UserLast.deleteManyUserLastMutationObject,
      deleteOne: UserLast.deleteOneUserLastMutationObject,
      updateMany: UserLast.updateManyUserLastMutationObject,
      updateOne: UserLast.updateOneUserLastMutationObject,
      upsertOne: UserLast.upsertOneUserLastMutationObject,
    },
  },
  Post: {
    Object: Post.PostObject,
    queries: {
      findFirst: Post.findFirstPostQueryObject,
      findMany: Post.findManyPostQueryObject,
      count: Post.countPostQueryObject,
      findUnique: Post.findUniquePostQueryObject,
    },
    mutations: {
      createMany: Post.createManyPostMutationObject,
      createOne: Post.createOnePostMutationObject,
      deleteMany: Post.deleteManyPostMutationObject,
      deleteOne: Post.deleteOnePostMutationObject,
      updateMany: Post.updateManyPostMutationObject,
      updateOne: Post.updateOnePostMutationObject,
      upsertOne: Post.upsertOnePostMutationObject,
    },
  },
  ExtraModal: {
    Object: ExtraModal.ExtraModalObject,
    queries: {
      findFirst: ExtraModal.findFirstExtraModalQueryObject,
      findMany: ExtraModal.findManyExtraModalQueryObject,
      count: ExtraModal.countExtraModalQueryObject,
      findUnique: ExtraModal.findUniqueExtraModalQueryObject,
    },
    mutations: {
      createMany: ExtraModal.createManyExtraModalMutationObject,
      createOne: ExtraModal.createOneExtraModalMutationObject,
      deleteMany: ExtraModal.deleteManyExtraModalMutationObject,
      deleteOne: ExtraModal.deleteOneExtraModalMutationObject,
      updateMany: ExtraModal.updateManyExtraModalMutationObject,
      updateOne: ExtraModal.updateOneExtraModalMutationObject,
      upsertOne: ExtraModal.upsertOneExtraModalMutationObject,
    },
  },
  Comment: {
    Object: Comment.CommentObject,
    queries: {
      findFirst: Comment.findFirstCommentQueryObject,
      findMany: Comment.findManyCommentQueryObject,
      count: Comment.countCommentQueryObject,
      findUnique: Comment.findUniqueCommentQueryObject,
    },
    mutations: {
      createMany: Comment.createManyCommentMutationObject,
      createOne: Comment.createOneCommentMutationObject,
      deleteMany: Comment.deleteManyCommentMutationObject,
      deleteOne: Comment.deleteOneCommentMutationObject,
      updateMany: Comment.updateManyCommentMutationObject,
      updateOne: Comment.updateOneCommentMutationObject,
      upsertOne: Comment.upsertOneCommentMutationObject,
    },
  },
  Profile: {
    Object: Profile.ProfileObject,
    queries: {
      findFirst: Profile.findFirstProfileQueryObject,
      findMany: Profile.findManyProfileQueryObject,
      count: Profile.countProfileQueryObject,
      findUnique: Profile.findUniqueProfileQueryObject,
    },
    mutations: {
      createMany: Profile.createManyProfileMutationObject,
      createOne: Profile.createOneProfileMutationObject,
      deleteMany: Profile.deleteManyProfileMutationObject,
      deleteOne: Profile.deleteOneProfileMutationObject,
      updateMany: Profile.updateManyProfileMutationObject,
      updateOne: Profile.updateOneProfileMutationObject,
      upsertOne: Profile.upsertOneProfileMutationObject,
    },
  },
  Follow: {
    Object: Follow.FollowObject,
    queries: {
      findFirst: Follow.findFirstFollowQueryObject,
      findMany: Follow.findManyFollowQueryObject,
      count: Follow.countFollowQueryObject,
      findUnique: Follow.findUniqueFollowQueryObject,
    },
    mutations: {
      createMany: Follow.createManyFollowMutationObject,
      createOne: Follow.createOneFollowMutationObject,
      deleteMany: Follow.deleteManyFollowMutationObject,
      deleteOne: Follow.deleteOneFollowMutationObject,
      updateMany: Follow.updateManyFollowMutationObject,
      updateOne: Follow.updateOneFollowMutationObject,
      upsertOne: Follow.upsertOneFollowMutationObject,
    },
  },
  Unrelated: {
    Object: Unrelated.UnrelatedObject,
    queries: {
      findFirst: Unrelated.findFirstUnrelatedQueryObject,
      findMany: Unrelated.findManyUnrelatedQueryObject,
      count: Unrelated.countUnrelatedQueryObject,
      findUnique: Unrelated.findUniqueUnrelatedQueryObject,
    },
    mutations: {
      createMany: Unrelated.createManyUnrelatedMutationObject,
      createOne: Unrelated.createOneUnrelatedMutationObject,
      deleteMany: Unrelated.deleteManyUnrelatedMutationObject,
      deleteOne: Unrelated.deleteOneUnrelatedMutationObject,
      updateMany: Unrelated.updateManyUnrelatedMutationObject,
      updateOne: Unrelated.updateOneUnrelatedMutationObject,
      upsertOne: Unrelated.upsertOneUnrelatedMutationObject,
    },
  },
  IdOnly: {
    Object: IdOnly.IdOnlyObject,
    queries: {
      findFirst: IdOnly.findFirstIdOnlyQueryObject,
      findMany: IdOnly.findManyIdOnlyQueryObject,
      count: IdOnly.countIdOnlyQueryObject,
      findUnique: IdOnly.findUniqueIdOnlyQueryObject,
    },
    mutations: {
      createMany: IdOnly.createManyIdOnlyMutationObject,
      createOne: IdOnly.createOneIdOnlyMutationObject,
      deleteMany: IdOnly.deleteManyIdOnlyMutationObject,
      deleteOne: IdOnly.deleteOneIdOnlyMutationObject,
      updateMany: IdOnly.updateManyIdOnlyMutationObject,
      updateOne: IdOnly.updateOneIdOnlyMutationObject,
      upsertOne: IdOnly.upsertOneIdOnlyMutationObject,
    },
  },
  WithoutID: {
    Object: WithoutID.WithoutIDObject,
    queries: {
      findFirst: WithoutID.findFirstWithoutIDQueryObject,
      findMany: WithoutID.findManyWithoutIDQueryObject,
      count: WithoutID.countWithoutIDQueryObject,
      findUnique: WithoutID.findUniqueWithoutIDQueryObject,
    },
    mutations: {
      createMany: WithoutID.createManyWithoutIDMutationObject,
      createOne: WithoutID.createOneWithoutIDMutationObject,
      deleteMany: WithoutID.deleteManyWithoutIDMutationObject,
      deleteOne: WithoutID.deleteOneWithoutIDMutationObject,
      updateMany: WithoutID.updateManyWithoutIDMutationObject,
      updateOne: WithoutID.updateOneWithoutIDMutationObject,
      upsertOne: WithoutID.upsertOneWithoutIDMutationObject,
    },
  },
  WithScalars: {
    Object: WithScalars.WithScalarsObject,
    queries: {
      findFirst: WithScalars.findFirstWithScalarsQueryObject,
      findMany: WithScalars.findManyWithScalarsQueryObject,
      count: WithScalars.countWithScalarsQueryObject,
      findUnique: WithScalars.findUniqueWithScalarsQueryObject,
    },
    mutations: {
      createMany: WithScalars.createManyWithScalarsMutationObject,
      createOne: WithScalars.createOneWithScalarsMutationObject,
      deleteMany: WithScalars.deleteManyWithScalarsMutationObject,
      deleteOne: WithScalars.deleteOneWithScalarsMutationObject,
      updateMany: WithScalars.updateManyWithScalarsMutationObject,
      updateOne: WithScalars.updateOneWithScalarsMutationObject,
      upsertOne: WithScalars.upsertOneWithScalarsMutationObject,
    },
  },
};

const crudEntries = Object.entries(Cruds);

type ResolverType = "Query" | "Mutation";
function generateResolversByType(type: ResolverType, opts?: CrudOptions) {
  return crudEntries
    .filter(([modelName]) => includeModel(modelName, opts))
    .map(([modelName, config]) => {
      const resolverEntries = Object.entries(config[type === "Query" ? "queries" : "mutations"]);

      return resolverEntries.map(([operationName, resolverObjectDefiner]) => {
        const resolverName = operationName + modelName;
        const isntPrismaFieldList = ["count", "deleteMany", "updateMany"];
        const isPrismaField = !isntPrismaFieldList.includes(operationName);

        const getFields = (t: any) => {
          const field = resolverObjectDefiner(t);
          const handledField = opts?.handleResolver
            ? opts.handleResolver({
                field,
                modelName: modelName as Model,
                operationName,
                resolverName,
                t,
                isPrismaField,
                type,
              })
            : field;

          return {
            [resolverName]: isPrismaField
              ? t.prismaField(handledField)
              : t.field(handledField),
          }
        }

        return type === "Query"
          ? builder.queryFields((t) => getFields(t))
          : builder.mutationFields((t) => getFields(t));
      });
    });
}

export function generateAllObjects(opts?: CrudOptions) {
  return crudEntries
    .filter(([md]) => includeModel(md, opts))
    .map(([modelName, { Object }]) => {
      return builder.prismaObject(modelName as Model, Object); // Objects is all imports
    });
}

export function generateAllQueries(opts?: CrudOptions) {
  generateResolversByType("Query", opts);
}

export function generateAllMutations(opts?: CrudOptions) {
  generateResolversByType("Mutation", opts);
}

export function generateAllResolvers(opts?: CrudOptions) {
  generateResolversByType("Mutation", opts);
  generateResolversByType("Query", opts);
}

type CrudOptions = {
  include?: Model[];
  exclude?: Model[];
  /**
   * Caution: This is not type safe
   * Wrap all queries/mutations to override args, run extra code in resolve function (ie: throw errors, logs), apply plugins, etc.
   */
  handleResolver?: (props: {
    modelName: Model;
    field: any;
    operationName: string;
    resolverName: string;
    t: any;
    isPrismaField: boolean;
    type: ResolverType;
  }) => any;
};

const includeModel = (model: string, opts?: CrudOptions): boolean => {
  if (!opts) return true;
  if (opts.include) return opts.include.includes(model as Model);
  if (opts.exclude) return !opts.exclude.includes(model as Model);
  return true;
};

export function generateAllCrud(opts?: CrudOptions) {
  generateAllObjects(opts);
  generateAllQueries(opts);
  generateAllMutations(opts);
}
