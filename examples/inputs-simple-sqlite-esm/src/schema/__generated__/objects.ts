import { Prisma } from '@prisma/client';
import { builder } from '../builder.js';

export const BatchPayload = builder.objectType(builder.objectRef<Prisma.BatchPayload>('BatchPayload'), {
  description: 'Batch payloads from prisma.',
  fields: (t) => ({
    count: t.exposeInt('count', { description: 'Prisma Batch Payload', nullable: false }),
  }),
});

export const modelNames = [
  'User',
  'UserLast',
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
