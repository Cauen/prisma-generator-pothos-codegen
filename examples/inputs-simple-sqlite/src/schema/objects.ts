import { builder } from "./builder";

/**
 * Here we defined the rest of the example objects
 */

export const Follow = builder.prismaObject('Follow', {
  findUnique: ({ fromId, toId }) => ({ compositeID: { fromId, toId } }),
  fields: (t) => ({
    fromId: t.exposeID('fromId'),
    toId: t.exposeID('toId'),
  }),
});

export const IdOnly = builder.prismaObject('IdOnly', {
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
  findUnique: ({ name }) => ({ name }),
  fields: (t) => ({
    id: t.exposeID('name'),
  }),
});