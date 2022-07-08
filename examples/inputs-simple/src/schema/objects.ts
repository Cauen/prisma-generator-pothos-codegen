import { builder } from "./builder";

/**
 * Here we defined the rest of the example objects
 */

export const Comment = builder.prismaObject('Comment', {
  findUnique: ({ id }) => ({ id: Number.parseInt(String(id || 1), 10) }),
  fields: (t) => ({
    id: t.exposeID('id'),
  }),
});

export const Follow = builder.prismaObject('Follow', {
  findUnique: ({ id }) => ({ id: Number.parseInt(String(id || 1), 10) }),
  fields: (t) => ({
    id: t.exposeID('id'),
  }),
});

export const IdOnly = builder.prismaObject('IdOnly', {
  findUnique: ({ id }) => ({ id: Number.parseInt(String(id || 1), 10) }),
  fields: (t) => ({
    id: t.exposeID('id'),
  }),
});

export const Post = builder.prismaObject('Post', {
  findUnique: ({ id }) => ({ id: Number.parseInt(String(id || 1), 10) }),
  fields: (t) => ({
    id: t.exposeID('id'),
  }),
});

export const Profile = builder.prismaObject('Profile', {
  findUnique: ({ id }) => ({ id: Number.parseInt(String(id || 1), 10) }),
  fields: (t) => ({
    id: t.exposeID('id'),
  }),
});

export const Unrelated = builder.prismaObject('Unrelated', {
  findUnique: ({ id }) => ({ id: Number.parseInt(String(id || 1), 10) }),
  fields: (t) => ({
    id: t.exposeID('id'),
  }),
});

export const WithScalars = builder.prismaObject('WithScalars', {
  findUnique: ({ id }) => ({ id: Number.parseInt(String(id || 1), 10) }),
  fields: (t) => ({
    id: t.exposeID('id'),
  }),
});

export const WithoutID = builder.prismaObject('WithoutID', {
  findUnique: ({ id }) => ({ id: Number.parseInt(String(id || 1), 10) }),
  fields: (t) => ({
    id: t.exposeID('id'),
  }),
});