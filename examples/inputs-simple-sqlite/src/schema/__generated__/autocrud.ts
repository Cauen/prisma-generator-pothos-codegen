import { builder } from '../builder';
import * as User from './User';
import * as Post from './Post';
import * as ExtraModal from './ExtraModal';
import * as Comment from './Comment';
import * as Profile from './Profile';
import * as Follow from './Follow';
import * as Unrelated from './Unrelated';
import * as IdOnly from './IdOnly';
import * as WithoutID from './WithoutID';
import * as WithScalars from './WithScalars';
import * as Objects from './objects';

const Cruds = {
  User: {
    Object: User.UserObject,
    queries: {

    },
    mutations: {

    },
  },
  Post: {
    Object: Post.PostObject,
    queries: {
      findFirst: Post.findFirstPostQuery,
      findMany: Post.findManyPostQuery,
      count: Post.countPostQuery,
      findUnique: Post.findUniquePostQuery,
    },
    mutations: {
      createMany: Post.createManyPostMutation,
      createOne: Post.createOnePostMutation,
      deleteMany: Post.deleteManyPostMutation,
      deleteOne: Post.deleteOnePostMutation,
      updateMany: Post.updateManyPostMutation,
      updateOne: Post.updateOnePostMutation,
      upsertOne: Post.upsertOnePostMutation,
    },
  },
  ExtraModal: {
    Object: ExtraModal.ExtraModalObject,
    queries: {
      findFirst: ExtraModal.findFirstExtraModalQuery,
      findMany: ExtraModal.findManyExtraModalQuery,
      count: ExtraModal.countExtraModalQuery,
      findUnique: ExtraModal.findUniqueExtraModalQuery,
    },
    mutations: {
      createMany: ExtraModal.createManyExtraModalMutation,
      createOne: ExtraModal.createOneExtraModalMutation,
      deleteMany: ExtraModal.deleteManyExtraModalMutation,
      deleteOne: ExtraModal.deleteOneExtraModalMutation,
      updateMany: ExtraModal.updateManyExtraModalMutation,
      updateOne: ExtraModal.updateOneExtraModalMutation,
      upsertOne: ExtraModal.upsertOneExtraModalMutation,
    },
  },
  Comment: {
    Object: Comment.CommentObject,
    queries: {
      findFirst: Comment.findFirstCommentQuery,
      findMany: Comment.findManyCommentQuery,
      count: Comment.countCommentQuery,
      findUnique: Comment.findUniqueCommentQuery,
    },
    mutations: {
      createMany: Comment.createManyCommentMutation,
      createOne: Comment.createOneCommentMutation,
      deleteMany: Comment.deleteManyCommentMutation,
      deleteOne: Comment.deleteOneCommentMutation,
      updateMany: Comment.updateManyCommentMutation,
      updateOne: Comment.updateOneCommentMutation,
      upsertOne: Comment.upsertOneCommentMutation,
    },
  },
  Profile: {
    Object: Profile.ProfileObject,
    queries: {
      findFirst: Profile.findFirstProfileQuery,
      findMany: Profile.findManyProfileQuery,
      count: Profile.countProfileQuery,
      findUnique: Profile.findUniqueProfileQuery,
    },
    mutations: {
      createMany: Profile.createManyProfileMutation,
      createOne: Profile.createOneProfileMutation,
      deleteMany: Profile.deleteManyProfileMutation,
      deleteOne: Profile.deleteOneProfileMutation,
      updateMany: Profile.updateManyProfileMutation,
      updateOne: Profile.updateOneProfileMutation,
      upsertOne: Profile.upsertOneProfileMutation,
    },
  },
  Follow: {
    Object: Follow.FollowObject,
    queries: {
      findFirst: Follow.findFirstFollowQuery,
      findMany: Follow.findManyFollowQuery,
      count: Follow.countFollowQuery,
      findUnique: Follow.findUniqueFollowQuery,
    },
    mutations: {
      createMany: Follow.createManyFollowMutation,
      createOne: Follow.createOneFollowMutation,
      deleteMany: Follow.deleteManyFollowMutation,
      deleteOne: Follow.deleteOneFollowMutation,
      updateMany: Follow.updateManyFollowMutation,
      updateOne: Follow.updateOneFollowMutation,
      upsertOne: Follow.upsertOneFollowMutation,
    },
  },
  Unrelated: {
    Object: Unrelated.UnrelatedObject,
    queries: {
      findFirst: Unrelated.findFirstUnrelatedQuery,
      findMany: Unrelated.findManyUnrelatedQuery,
      count: Unrelated.countUnrelatedQuery,
      findUnique: Unrelated.findUniqueUnrelatedQuery,
    },
    mutations: {
      createMany: Unrelated.createManyUnrelatedMutation,
      createOne: Unrelated.createOneUnrelatedMutation,
      deleteMany: Unrelated.deleteManyUnrelatedMutation,
      deleteOne: Unrelated.deleteOneUnrelatedMutation,
      updateMany: Unrelated.updateManyUnrelatedMutation,
      updateOne: Unrelated.updateOneUnrelatedMutation,
      upsertOne: Unrelated.upsertOneUnrelatedMutation,
    },
  },
  IdOnly: {
    Object: IdOnly.IdOnlyObject,
    queries: {
      findFirst: IdOnly.findFirstIdOnlyQuery,
      findMany: IdOnly.findManyIdOnlyQuery,
      count: IdOnly.countIdOnlyQuery,
      findUnique: IdOnly.findUniqueIdOnlyQuery,
    },
    mutations: {
      createMany: IdOnly.createManyIdOnlyMutation,
      createOne: IdOnly.createOneIdOnlyMutation,
      deleteMany: IdOnly.deleteManyIdOnlyMutation,
      deleteOne: IdOnly.deleteOneIdOnlyMutation,
      updateMany: IdOnly.updateManyIdOnlyMutation,
      updateOne: IdOnly.updateOneIdOnlyMutation,
      upsertOne: IdOnly.upsertOneIdOnlyMutation,
    },
  },
  WithoutID: {
    Object: WithoutID.WithoutIDObject,
    queries: {
      findFirst: WithoutID.findFirstWithoutIDQuery,
      findMany: WithoutID.findManyWithoutIDQuery,
      count: WithoutID.countWithoutIDQuery,
      findUnique: WithoutID.findUniqueWithoutIDQuery,
    },
    mutations: {
      createMany: WithoutID.createManyWithoutIDMutation,
      createOne: WithoutID.createOneWithoutIDMutation,
      deleteMany: WithoutID.deleteManyWithoutIDMutation,
      deleteOne: WithoutID.deleteOneWithoutIDMutation,
      updateMany: WithoutID.updateManyWithoutIDMutation,
      updateOne: WithoutID.updateOneWithoutIDMutation,
      upsertOne: WithoutID.upsertOneWithoutIDMutation,
    },
  },
  WithScalars: {
    Object: WithScalars.WithScalarsObject,
    queries: {
      findFirst: WithScalars.findFirstWithScalarsQuery,
      findMany: WithScalars.findManyWithScalarsQuery,
      count: WithScalars.countWithScalarsQuery,
      findUnique: WithScalars.findUniqueWithScalarsQuery,
    },
    mutations: {
      createMany: WithScalars.createManyWithScalarsMutation,
      createOne: WithScalars.createOneWithScalarsMutation,
      deleteMany: WithScalars.deleteManyWithScalarsMutation,
      deleteOne: WithScalars.deleteOneWithScalarsMutation,
      updateMany: WithScalars.updateManyWithScalarsMutation,
      updateOne: WithScalars.updateOneWithScalarsMutation,
      upsertOne: WithScalars.upsertOneWithScalarsMutation,
    },
  },
};

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
const getEntries = <T extends object>(obj: T) => Object.entries(obj) as Entries<T>;
const crudEntries = getEntries(Cruds);

export function generateAllObjects(opts?: CrudOptions) {
  return crudEntries
    .filter(([md]) => includeModel(md, opts))
    .map(([modelName, { Object }]) => {
      return builder.prismaObject(modelName as Model, Object as any); // Objects is all imports
    });
}

export function generateAllQueries(opts?: CrudOptions) {
  return crudEntries
    .filter(([name, object]) => includeModel(name, opts))
    .map(([name, { queries }]) => {
      const queriEntries = getEntries(queries);
      return queriEntries.map((entry) => builder.queryFields(entry[1]));
    });
}

export function generateAllMutations(opts?: CrudOptions) {
  return crudEntries
    .filter(([name, object]) => includeModel(name, opts))
    .map(([name, { mutations }]) => {
      const queriEntries = getEntries(mutations);
      return queriEntries.map((entry) => builder.mutationFields(entry[1]));
    });
}

type Model = Objects.Model;

type CrudOptions = { include: Model[], exclude?: never } | { exclude: Model[], include?: never };
const includeModel = (model: Model, opts?: CrudOptions): boolean => {
  if (!opts) return true;
  if (opts.include) return opts.include.includes(model);
  if (opts.exclude) return !opts.exclude.includes(model);
  return false;
};

export function generateAllCrud(opts?: CrudOptions) {
  generateAllObjects(opts);
  generateAllQueries(opts);
  generateAllMutations(opts);
};
