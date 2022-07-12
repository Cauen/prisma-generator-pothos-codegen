export * from './User'
export * from './Post'
export * from './Comment'
export * from './Profile'
export * from './Follow'
export * from './Unrelated'
export * from './IdOnly'
export * from './WithoutID'
export * from './WithScalars'

import { builder } from "@/schema/builder";
import { Prisma } from '.prisma/client'

export const BatchPayload = builder.objectType(builder.objectRef<Prisma.BatchPayload>('BatchPayload'), {
  description: 'Batch payloads from prisma.',
  fields: (t) => ({
    count: t.exposeInt('count', { description: 'Prisma Batch Payload', nullable: false }),
  }),
});
  