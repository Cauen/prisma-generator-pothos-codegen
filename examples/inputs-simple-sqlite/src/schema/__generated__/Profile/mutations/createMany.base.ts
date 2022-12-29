import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyProfileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Profile'],
    nullable: false,
    args: { data: t.arg({ type: [Inputs.ProfileCreateInput], required: true }) },
    resolve: async (_query, _root, args, _context, _info) =>
      await _context.db.$transaction(args.data.map((data) => _context.db.profile.create({ data }))),
  }),
);

export const createManyProfileMutation = defineMutation((t) => ({
  createManyProfile: t.prismaField(createManyProfileMutationObject(t)),
}));
