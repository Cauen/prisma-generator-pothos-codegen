import { builder } from "../builder"
import { Post } from "./object"
import * as Inputs from '@/generated/inputs'
import { db } from "@/db"

export const mutations = builder.mutationFields((t) => ({
  createOnePost: t.field({
    type: Post,
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.PostCreateInput, required: true }),
    },
    resolve: async (root, args) => {
      const post = await db.post.create({
        data: args.data,
      })

      return post
    }
  })
}))
