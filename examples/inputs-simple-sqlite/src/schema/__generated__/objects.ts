export * from './User';
export * from './Post';
export * from './ExtraModal';
export * from './Comment';
export * from './Profile';
export * from './Follow';
export * from './Unrelated';
export * from './IdOnly';
export * from './WithoutID';
export * from './WithScalars';

import { builder } from '../builder';
import { Prisma } from '.prisma/client';

export const BatchPayload = builder.objectType(builder.objectRef<Prisma.BatchPayload>('BatchPayload'), {
  description: 'Batch payloads from prisma.',
  fields: (t) => ({
    count: t.exposeInt('count', { description: 'Prisma Batch Payload', nullable: false }),
  }),
});

export const modelNames = [
  'User',
  'Post',
  'ExtraModal',
  'Comment',
  'Profile',
  'Follow',
  'Unrelated',
  'IdOnly',
  'WithoutID',
  'WithScalars',
] as const;

export type Model = typeof modelNames[number];
