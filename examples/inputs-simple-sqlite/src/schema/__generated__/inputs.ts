// @ts-nocheck
import { Prisma } from '@prisma/client';

import { builder } from '../builder';

type Filters = {
  string: Prisma.StringFieldUpdateOperationsInput;
  nullableString: Prisma.NullableStringFieldUpdateOperationsInput;
  dateTime: Prisma.DateTimeFieldUpdateOperationsInput;
  nullableDateTime: Prisma.NullableDateTimeFieldUpdateOperationsInput;
  int: Prisma.IntFieldUpdateOperationsInput;
  nullableInt: Prisma.NullableIntFieldUpdateOperationsInput;
  bool: Prisma.BoolFieldUpdateOperationsInput;
  nullableBool: Prisma.NullableBoolFieldUpdateOperationsInput;
  bigInt: Prisma.BigIntFieldUpdateOperationsInput;
  nullableBigInt: Prisma.NullableBigIntFieldUpdateOperationsInput;
  bytes: Prisma.BytesFieldUpdateOperationsInput;
  nullableBytes: Prisma.NullableBytesFieldUpdateOperationsInput;
  float: Prisma.FloatFieldUpdateOperationsInput;
  nullableFloat: Prisma.NullableFloatFieldUpdateOperationsInput;
  decimal: Prisma.DecimalFieldUpdateOperationsInput;
  nullableDecimal: Prisma.NullableDecimalFieldUpdateOperationsInput;
};

type ApplyFilters<InputField> = {
  [F in keyof Filters]: 0 extends 1 & Filters[F]
    ? never
    : Filters[F] extends InputField
    ? Filters[F]
    : never;
}[keyof Filters];

type PrismaUpdateOperationsInputFilter<T extends object> = {
  [K in keyof T]: [ApplyFilters<T[K]>] extends [never] ? T[K] : ApplyFilters<T[K]>
};

export const DateTime = builder.scalarType('DateTime', {
  parseValue: (value) => {
    try {
      const date = new Date(value)
      if (date.toString() === 'Invalid Date') throw new Error('Invalid Date')
      return date
    } catch (error) {
      throw new Error('Invalid Date');
    }
  },
  serialize: (value) => value ? new Date(value) : null,
});

export const Decimal = builder.scalarType('Decimal', {
  serialize: (value) => parseFloat(value),
  parseValue: (value) => {
    try {
      return new Prisma.Decimal(parseFloat(value));
    } catch (error) {
      throw new Error('Invalid Decimal');
    }
  },
});

export const Bytes = builder.scalarType('Bytes', {
  serialize: (value) => value,
  parseValue: (value) => {
    if (Array.isArray(value)) return Buffer.from(value);
    if (typeof value === 'string') return Buffer.from(value, 'utf8');
    throw new Error('Bytes must be string or array');
  },
});

export const Bigint = builder.scalarType('BigInt', {
  serialize: (value) => value.toString(),
  parseValue: (value) => {
    try {
      return BigInt(value);
    } catch (error) {
      throw new Error('Invalid Bigint');
    } 
  },
});

export const NEVER = builder.scalarType('NEVER', {
  serialize: (value) => value,
  description: 'Never fill this, its created for inputs that dont have fields',
});

export const TransactionIsolationLevel = builder.enumType('TransactionIsolationLevel', {
  values: ["Serializable"] as const,
});

export const UserScalarFieldEnum = builder.enumType('UserScalarFieldEnum', {
  values: ["id","firstName","lastName","birthdate","login","password","createdAt","updatedAt"] as const,
});

export const PostScalarFieldEnum = builder.enumType('PostScalarFieldEnum', {
  values: ["id","title","content","authorId"] as const,
});

export const ExtraModalScalarFieldEnum = builder.enumType('ExtraModalScalarFieldEnum', {
  values: ["id","title","createdAt","updatedAt"] as const,
});

export const CommentScalarFieldEnum = builder.enumType('CommentScalarFieldEnum', {
  values: ["id","comment","authorId","postId"] as const,
});

export const ProfileScalarFieldEnum = builder.enumType('ProfileScalarFieldEnum', {
  values: ["id","bio","userId"] as const,
});

export const FollowScalarFieldEnum = builder.enumType('FollowScalarFieldEnum', {
  values: ["fromId","toId"] as const,
});

export const UnrelatedScalarFieldEnum = builder.enumType('UnrelatedScalarFieldEnum', {
  values: ["id","name"] as const,
});

export const IdOnlyScalarFieldEnum = builder.enumType('IdOnlyScalarFieldEnum', {
  values: ["id"] as const,
});

export const WithoutIDScalarFieldEnum = builder.enumType('WithoutIDScalarFieldEnum', {
  values: ["name"] as const,
});

export const WithScalarsScalarFieldEnum = builder.enumType('WithScalarsScalarFieldEnum', {
  values: ["id","string","boolean","int","float","decimal","bigint","datetime","bytes"] as const,
});

export const SortOrder = builder.enumType('SortOrder', {
  values: ["asc","desc"] as const,
});

export const NullsOrder = builder.enumType('NullsOrder', {
  values: ["first","last"] as const,
});

export const UserWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[UserWhereInput]}),
  OR: t.field({"required":false,"type":[UserWhereInput]}),
  NOT: t.field({"required":false,"type":[UserWhereInput]}),
  id: t.field({"required":false,"type":IntFilter}),
  firstName: t.field({"required":false,"type":StringFilter}),
  lastName: t.field({"required":false,"type":StringFilter}),
  birthdate: t.field({"required":false,"type":DateTimeFilter}),
  login: t.field({"required":false,"type":StringFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeNullableFilter}),
  Posts: t.field({"required":false,"type":PostListRelationFilter}),
  Comments: t.field({"required":false,"type":CommentListRelationFilter}),
  Profile: t.field({"required":false,"type":ProfileListRelationFilter}),
  Followers: t.field({"required":false,"type":FollowListRelationFilter}),
  Following: t.field({"required":false,"type":FollowListRelationFilter}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
});
export const UserWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserWhereInput>>('UserWhereInput').implement({
  fields: UserWhereInputFields,
});

export const UserOrderByWithRelationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  firstName: t.field({"required":false,"type":SortOrder}),
  lastName: t.field({"required":false,"type":SortOrder}),
  birthdate: t.field({"required":false,"type":SortOrder}),
  login: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  Posts: t.field({"required":false,"type":PostOrderByRelationAggregateInput}),
  Comments: t.field({"required":false,"type":CommentOrderByRelationAggregateInput}),
  Profile: t.field({"required":false,"type":ProfileOrderByRelationAggregateInput}),
  Followers: t.field({"required":false,"type":FollowOrderByRelationAggregateInput}),
  Following: t.field({"required":false,"type":FollowOrderByRelationAggregateInput}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
});
export const UserOrderByWithRelationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserOrderByWithRelationInput>>('UserOrderByWithRelationInput').implement({
  fields: UserOrderByWithRelationInputFields,
});

export const UserWhereUniqueInputFields = (t: any) => ({
  id: t.int({"required":false}),
  AND: t.field({"required":false,"type":[UserWhereInput]}),
  OR: t.field({"required":false,"type":[UserWhereInput]}),
  NOT: t.field({"required":false,"type":[UserWhereInput]}),
  firstName: t.field({"required":false,"type":StringFilter}),
  lastName: t.field({"required":false,"type":StringFilter}),
  birthdate: t.field({"required":false,"type":DateTimeFilter}),
  login: t.field({"required":false,"type":StringFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeNullableFilter}),
  Posts: t.field({"required":false,"type":PostListRelationFilter}),
  Comments: t.field({"required":false,"type":CommentListRelationFilter}),
  Profile: t.field({"required":false,"type":ProfileListRelationFilter}),
  Followers: t.field({"required":false,"type":FollowListRelationFilter}),
  Following: t.field({"required":false,"type":FollowListRelationFilter}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
});
export const UserWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserWhereUniqueInput>>('UserWhereUniqueInput').implement({
  fields: UserWhereUniqueInputFields,
});

export const PostWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[PostWhereInput]}),
  OR: t.field({"required":false,"type":[PostWhereInput]}),
  NOT: t.field({"required":false,"type":[PostWhereInput]}),
  id: t.field({"required":false,"type":IntFilter}),
  title: t.field({"required":false,"type":StringFilter}),
  content: t.field({"required":false,"type":StringFilter}),
  authorId: t.field({"required":false,"type":IntFilter}),
  Author: t.field({"required":false,"type":UserWhereInput}),
  Comments: t.field({"required":false,"type":CommentListRelationFilter}),
});
export const PostWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostWhereInput>>('PostWhereInput').implement({
  fields: PostWhereInputFields,
});

export const PostOrderByWithRelationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  title: t.field({"required":false,"type":SortOrder}),
  content: t.field({"required":false,"type":SortOrder}),
  authorId: t.field({"required":false,"type":SortOrder}),
  Author: t.field({"required":false,"type":UserOrderByWithRelationInput}),
  Comments: t.field({"required":false,"type":CommentOrderByRelationAggregateInput}),
});
export const PostOrderByWithRelationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostOrderByWithRelationInput>>('PostOrderByWithRelationInput').implement({
  fields: PostOrderByWithRelationInputFields,
});

export const PostWhereUniqueInputFields = (t: any) => ({
  id: t.int({"required":false}),
  AND: t.field({"required":false,"type":[PostWhereInput]}),
  OR: t.field({"required":false,"type":[PostWhereInput]}),
  NOT: t.field({"required":false,"type":[PostWhereInput]}),
  title: t.field({"required":false,"type":StringFilter}),
  content: t.field({"required":false,"type":StringFilter}),
  authorId: t.field({"required":false,"type":IntFilter}),
  Author: t.field({"required":false,"type":UserWhereInput}),
  Comments: t.field({"required":false,"type":CommentListRelationFilter}),
});
export const PostWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostWhereUniqueInput>>('PostWhereUniqueInput').implement({
  fields: PostWhereUniqueInputFields,
});

export const ExtraModalWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[ExtraModalWhereInput]}),
  OR: t.field({"required":false,"type":[ExtraModalWhereInput]}),
  NOT: t.field({"required":false,"type":[ExtraModalWhereInput]}),
  id: t.field({"required":false,"type":IntFilter}),
  title: t.field({"required":false,"type":StringFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeNullableFilter}),
});
export const ExtraModalWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ExtraModalWhereInput>>('ExtraModalWhereInput').implement({
  fields: ExtraModalWhereInputFields,
});

export const ExtraModalOrderByWithRelationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  title: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
});
export const ExtraModalOrderByWithRelationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ExtraModalOrderByWithRelationInput>>('ExtraModalOrderByWithRelationInput').implement({
  fields: ExtraModalOrderByWithRelationInputFields,
});

export const ExtraModalWhereUniqueInputFields = (t: any) => ({
  id: t.int({"required":false}),
  AND: t.field({"required":false,"type":[ExtraModalWhereInput]}),
  OR: t.field({"required":false,"type":[ExtraModalWhereInput]}),
  NOT: t.field({"required":false,"type":[ExtraModalWhereInput]}),
  title: t.field({"required":false,"type":StringFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeNullableFilter}),
});
export const ExtraModalWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ExtraModalWhereUniqueInput>>('ExtraModalWhereUniqueInput').implement({
  fields: ExtraModalWhereUniqueInputFields,
});

export const CommentWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[CommentWhereInput]}),
  OR: t.field({"required":false,"type":[CommentWhereInput]}),
  NOT: t.field({"required":false,"type":[CommentWhereInput]}),
  id: t.field({"required":false,"type":IntFilter}),
  comment: t.field({"required":false,"type":StringFilter}),
  authorId: t.field({"required":false,"type":IntFilter}),
  postId: t.field({"required":false,"type":IntFilter}),
  Author: t.field({"required":false,"type":UserWhereInput}),
  Post: t.field({"required":false,"type":PostWhereInput}),
});
export const CommentWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentWhereInput>>('CommentWhereInput').implement({
  fields: CommentWhereInputFields,
});

export const CommentOrderByWithRelationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  comment: t.field({"required":false,"type":SortOrder}),
  authorId: t.field({"required":false,"type":SortOrder}),
  postId: t.field({"required":false,"type":SortOrder}),
  Author: t.field({"required":false,"type":UserOrderByWithRelationInput}),
  Post: t.field({"required":false,"type":PostOrderByWithRelationInput}),
});
export const CommentOrderByWithRelationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentOrderByWithRelationInput>>('CommentOrderByWithRelationInput').implement({
  fields: CommentOrderByWithRelationInputFields,
});

export const CommentWhereUniqueInputFields = (t: any) => ({
  id: t.int({"required":false}),
  AND: t.field({"required":false,"type":[CommentWhereInput]}),
  OR: t.field({"required":false,"type":[CommentWhereInput]}),
  NOT: t.field({"required":false,"type":[CommentWhereInput]}),
  comment: t.field({"required":false,"type":StringFilter}),
  authorId: t.field({"required":false,"type":IntFilter}),
  postId: t.field({"required":false,"type":IntFilter}),
  Author: t.field({"required":false,"type":UserWhereInput}),
  Post: t.field({"required":false,"type":PostWhereInput}),
});
export const CommentWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentWhereUniqueInput>>('CommentWhereUniqueInput').implement({
  fields: CommentWhereUniqueInputFields,
});

export const ProfileWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[ProfileWhereInput]}),
  OR: t.field({"required":false,"type":[ProfileWhereInput]}),
  NOT: t.field({"required":false,"type":[ProfileWhereInput]}),
  id: t.field({"required":false,"type":IntFilter}),
  bio: t.field({"required":false,"type":StringNullableFilter}),
  userId: t.field({"required":false,"type":IntFilter}),
  User: t.field({"required":false,"type":UserWhereInput}),
});
export const ProfileWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileWhereInput>>('ProfileWhereInput').implement({
  fields: ProfileWhereInputFields,
});

export const ProfileOrderByWithRelationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  bio: t.field({"required":false,"type":SortOrder}),
  userId: t.field({"required":false,"type":SortOrder}),
  User: t.field({"required":false,"type":UserOrderByWithRelationInput}),
});
export const ProfileOrderByWithRelationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileOrderByWithRelationInput>>('ProfileOrderByWithRelationInput').implement({
  fields: ProfileOrderByWithRelationInputFields,
});

export const ProfileWhereUniqueInputFields = (t: any) => ({
  id: t.int({"required":false}),
  userId: t.int({"required":false}),
  AND: t.field({"required":false,"type":[ProfileWhereInput]}),
  OR: t.field({"required":false,"type":[ProfileWhereInput]}),
  NOT: t.field({"required":false,"type":[ProfileWhereInput]}),
  bio: t.field({"required":false,"type":StringNullableFilter}),
  User: t.field({"required":false,"type":UserWhereInput}),
});
export const ProfileWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileWhereUniqueInput>>('ProfileWhereUniqueInput').implement({
  fields: ProfileWhereUniqueInputFields,
});

export const FollowWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[FollowWhereInput]}),
  OR: t.field({"required":false,"type":[FollowWhereInput]}),
  NOT: t.field({"required":false,"type":[FollowWhereInput]}),
  fromId: t.field({"required":false,"type":IntFilter}),
  toId: t.field({"required":false,"type":IntFilter}),
  From: t.field({"required":false,"type":UserWhereInput}),
  To: t.field({"required":false,"type":UserWhereInput}),
});
export const FollowWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowWhereInput>>('FollowWhereInput').implement({
  fields: FollowWhereInputFields,
});

export const FollowOrderByWithRelationInputFields = (t: any) => ({
  fromId: t.field({"required":false,"type":SortOrder}),
  toId: t.field({"required":false,"type":SortOrder}),
  From: t.field({"required":false,"type":UserOrderByWithRelationInput}),
  To: t.field({"required":false,"type":UserOrderByWithRelationInput}),
});
export const FollowOrderByWithRelationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowOrderByWithRelationInput>>('FollowOrderByWithRelationInput').implement({
  fields: FollowOrderByWithRelationInputFields,
});

export const FollowWhereUniqueInputFields = (t: any) => ({
  compositeID: t.field({"required":false,"type":FollowCompositeIDCompoundUniqueInput}),
  AND: t.field({"required":false,"type":[FollowWhereInput]}),
  OR: t.field({"required":false,"type":[FollowWhereInput]}),
  NOT: t.field({"required":false,"type":[FollowWhereInput]}),
  fromId: t.field({"required":false,"type":IntFilter}),
  toId: t.field({"required":false,"type":IntFilter}),
  From: t.field({"required":false,"type":UserWhereInput}),
  To: t.field({"required":false,"type":UserWhereInput}),
});
export const FollowWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowWhereUniqueInput>>('FollowWhereUniqueInput').implement({
  fields: FollowWhereUniqueInputFields,
});

export const UnrelatedWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[UnrelatedWhereInput]}),
  OR: t.field({"required":false,"type":[UnrelatedWhereInput]}),
  NOT: t.field({"required":false,"type":[UnrelatedWhereInput]}),
  id: t.field({"required":false,"type":IntFilter}),
  name: t.field({"required":false,"type":StringNullableFilter}),
});
export const UnrelatedWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UnrelatedWhereInput>>('UnrelatedWhereInput').implement({
  fields: UnrelatedWhereInputFields,
});

export const UnrelatedOrderByWithRelationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  name: t.field({"required":false,"type":SortOrder}),
});
export const UnrelatedOrderByWithRelationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UnrelatedOrderByWithRelationInput>>('UnrelatedOrderByWithRelationInput').implement({
  fields: UnrelatedOrderByWithRelationInputFields,
});

export const UnrelatedWhereUniqueInputFields = (t: any) => ({
  id: t.int({"required":false}),
  AND: t.field({"required":false,"type":[UnrelatedWhereInput]}),
  OR: t.field({"required":false,"type":[UnrelatedWhereInput]}),
  NOT: t.field({"required":false,"type":[UnrelatedWhereInput]}),
  name: t.field({"required":false,"type":StringNullableFilter}),
});
export const UnrelatedWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UnrelatedWhereUniqueInput>>('UnrelatedWhereUniqueInput').implement({
  fields: UnrelatedWhereUniqueInputFields,
});

export const IdOnlyWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[IdOnlyWhereInput]}),
  OR: t.field({"required":false,"type":[IdOnlyWhereInput]}),
  NOT: t.field({"required":false,"type":[IdOnlyWhereInput]}),
  id: t.field({"required":false,"type":IntFilter}),
});
export const IdOnlyWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IdOnlyWhereInput>>('IdOnlyWhereInput').implement({
  fields: IdOnlyWhereInputFields,
});

export const IdOnlyOrderByWithRelationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
});
export const IdOnlyOrderByWithRelationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IdOnlyOrderByWithRelationInput>>('IdOnlyOrderByWithRelationInput').implement({
  fields: IdOnlyOrderByWithRelationInputFields,
});

export const IdOnlyWhereUniqueInputFields = (t: any) => ({
  id: t.int({"required":false}),
  AND: t.field({"required":false,"type":[IdOnlyWhereInput]}),
  OR: t.field({"required":false,"type":[IdOnlyWhereInput]}),
  NOT: t.field({"required":false,"type":[IdOnlyWhereInput]}),
});
export const IdOnlyWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IdOnlyWhereUniqueInput>>('IdOnlyWhereUniqueInput').implement({
  fields: IdOnlyWhereUniqueInputFields,
});

export const WithoutIDWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[WithoutIDWhereInput]}),
  OR: t.field({"required":false,"type":[WithoutIDWhereInput]}),
  NOT: t.field({"required":false,"type":[WithoutIDWhereInput]}),
  name: t.field({"required":false,"type":StringFilter}),
});
export const WithoutIDWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithoutIDWhereInput>>('WithoutIDWhereInput').implement({
  fields: WithoutIDWhereInputFields,
});

export const WithoutIDOrderByWithRelationInputFields = (t: any) => ({
  name: t.field({"required":false,"type":SortOrder}),
});
export const WithoutIDOrderByWithRelationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithoutIDOrderByWithRelationInput>>('WithoutIDOrderByWithRelationInput').implement({
  fields: WithoutIDOrderByWithRelationInputFields,
});

export const WithoutIDWhereUniqueInputFields = (t: any) => ({
  name: t.string({"required":false}),
  AND: t.field({"required":false,"type":[WithoutIDWhereInput]}),
  OR: t.field({"required":false,"type":[WithoutIDWhereInput]}),
  NOT: t.field({"required":false,"type":[WithoutIDWhereInput]}),
});
export const WithoutIDWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithoutIDWhereUniqueInput>>('WithoutIDWhereUniqueInput').implement({
  fields: WithoutIDWhereUniqueInputFields,
});

export const WithScalarsWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[WithScalarsWhereInput]}),
  OR: t.field({"required":false,"type":[WithScalarsWhereInput]}),
  NOT: t.field({"required":false,"type":[WithScalarsWhereInput]}),
  id: t.field({"required":false,"type":BigIntFilter}),
  string: t.field({"required":false,"type":StringNullableFilter}),
  boolean: t.field({"required":false,"type":BoolNullableFilter}),
  int: t.field({"required":false,"type":IntNullableFilter}),
  float: t.field({"required":false,"type":FloatNullableFilter}),
  decimal: t.field({"required":false,"type":DecimalNullableFilter}),
  bigint: t.field({"required":false,"type":BigIntNullableFilter}),
  datetime: t.field({"required":false,"type":DateTimeNullableFilter}),
  bytes: t.field({"required":false,"type":BytesNullableFilter}),
});
export const WithScalarsWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithScalarsWhereInput>>('WithScalarsWhereInput').implement({
  fields: WithScalarsWhereInputFields,
});

export const WithScalarsOrderByWithRelationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  string: t.field({"required":false,"type":SortOrder}),
  boolean: t.field({"required":false,"type":SortOrder}),
  int: t.field({"required":false,"type":SortOrder}),
  float: t.field({"required":false,"type":SortOrder}),
  decimal: t.field({"required":false,"type":SortOrder}),
  bigint: t.field({"required":false,"type":SortOrder}),
  datetime: t.field({"required":false,"type":SortOrder}),
  bytes: t.field({"required":false,"type":SortOrder}),
});
export const WithScalarsOrderByWithRelationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithScalarsOrderByWithRelationInput>>('WithScalarsOrderByWithRelationInput').implement({
  fields: WithScalarsOrderByWithRelationInputFields,
});

export const WithScalarsWhereUniqueInputFields = (t: any) => ({
  id: t.field({"required":false,"type":Bigint}),
  AND: t.field({"required":false,"type":[WithScalarsWhereInput]}),
  OR: t.field({"required":false,"type":[WithScalarsWhereInput]}),
  NOT: t.field({"required":false,"type":[WithScalarsWhereInput]}),
  string: t.field({"required":false,"type":StringNullableFilter}),
  boolean: t.field({"required":false,"type":BoolNullableFilter}),
  int: t.field({"required":false,"type":IntNullableFilter}),
  float: t.field({"required":false,"type":FloatNullableFilter}),
  decimal: t.field({"required":false,"type":DecimalNullableFilter}),
  bigint: t.field({"required":false,"type":BigIntNullableFilter}),
  datetime: t.field({"required":false,"type":DateTimeNullableFilter}),
  bytes: t.field({"required":false,"type":BytesNullableFilter}),
});
export const WithScalarsWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithScalarsWhereUniqueInput>>('WithScalarsWhereUniqueInput').implement({
  fields: WithScalarsWhereUniqueInputFields,
});

export const UserCreateInputFields = (t: any) => ({
  id: t.int({"required":false}),
  firstName: t.string({"required":true}),
  lastName: t.string({"required":true}),
  birthdate: t.field({"required":true,"type":DateTime}),
  login: t.string({"required":true}),
  Posts: t.field({"required":false,"type":PostCreateNestedManyWithoutAuthorInput}),
  Comments: t.field({"required":false,"type":CommentCreateNestedManyWithoutAuthorInput}),
  Profile: t.field({"required":false,"type":ProfileCreateNestedManyWithoutUserInput}),
  Followers: t.field({"required":false,"type":FollowCreateNestedManyWithoutToInput}),
  Following: t.field({"required":false,"type":FollowCreateNestedManyWithoutFromInput}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const UserCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUncheckedCreateInput>>('UserCreateInput').implement({
  fields: UserCreateInputFields,
});

export const UserUpdateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":IntFieldUpdateOperationsInput}),
  firstName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  lastName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  birthdate: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  login: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  Posts: t.field({"required":false,"type":PostUpdateManyWithoutAuthorNestedInput}),
  Comments: t.field({"required":false,"type":CommentUpdateManyWithoutAuthorNestedInput}),
  Profile: t.field({"required":false,"type":ProfileUpdateManyWithoutUserNestedInput}),
  Followers: t.field({"required":false,"type":FollowUpdateManyWithoutToNestedInput}),
  Following: t.field({"required":false,"type":FollowUpdateManyWithoutFromNestedInput}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const UserUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUncheckedUpdateInput>>('UserUpdateInput').implement({
  fields: UserUpdateInputFields,
});

export const UserUpdateManyMutationInputFields = (t: any) => ({
  firstName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  lastName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  birthdate: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  login: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const UserUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateManyMutationInput>>('UserUpdateManyMutationInput').implement({
  fields: UserUpdateManyMutationInputFields,
});

export const PostCreateInputFields = (t: any) => ({
  id: t.int({"required":false}),
  title: t.string({"required":true}),
  content: t.string({"required":true}),
  authorId: t.int({"required":true}),
  Comments: t.field({"required":false,"type":CommentCreateNestedManyWithoutPostInput}),
});
export const PostCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUncheckedCreateInput>>('PostCreateInput').implement({
  fields: PostCreateInputFields,
});

export const PostUpdateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":IntFieldUpdateOperationsInput}),
  title: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  content: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  authorId: t.field({"required":false,"type":IntFieldUpdateOperationsInput}),
  Comments: t.field({"required":false,"type":CommentUpdateManyWithoutPostNestedInput}),
});
export const PostUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUncheckedUpdateInput>>('PostUpdateInput').implement({
  fields: PostUpdateInputFields,
});

export const PostUpdateManyMutationInputFields = (t: any) => ({
  title: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  content: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
});
export const PostUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateManyMutationInput>>('PostUpdateManyMutationInput').implement({
  fields: PostUpdateManyMutationInputFields,
});

export const ExtraModalCreateInputFields = (t: any) => ({
  id: t.int({"required":false}),
  title: t.string({"required":true}),
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const ExtraModalCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ExtraModalUncheckedCreateInput>>('ExtraModalCreateInput').implement({
  fields: ExtraModalCreateInputFields,
});

export const ExtraModalUpdateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":IntFieldUpdateOperationsInput}),
  title: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const ExtraModalUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ExtraModalUncheckedUpdateInput>>('ExtraModalUpdateInput').implement({
  fields: ExtraModalUpdateInputFields,
});

export const ExtraModalUpdateManyMutationInputFields = (t: any) => ({
  title: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const ExtraModalUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ExtraModalUpdateManyMutationInput>>('ExtraModalUpdateManyMutationInput').implement({
  fields: ExtraModalUpdateManyMutationInputFields,
});

export const CommentCreateInputFields = (t: any) => ({
  id: t.int({"required":false}),
  comment: t.string({"required":true}),
  authorId: t.int({"required":true}),
  postId: t.int({"required":true}),
});
export const CommentCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentUncheckedCreateInput>>('CommentCreateInput').implement({
  fields: CommentCreateInputFields,
});

export const CommentUpdateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":IntFieldUpdateOperationsInput}),
  comment: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  authorId: t.field({"required":false,"type":IntFieldUpdateOperationsInput}),
  postId: t.field({"required":false,"type":IntFieldUpdateOperationsInput}),
});
export const CommentUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentUncheckedUpdateInput>>('CommentUpdateInput').implement({
  fields: CommentUpdateInputFields,
});

export const CommentUpdateManyMutationInputFields = (t: any) => ({
  comment: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
});
export const CommentUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentUpdateManyMutationInput>>('CommentUpdateManyMutationInput').implement({
  fields: CommentUpdateManyMutationInputFields,
});

export const ProfileCreateInputFields = (t: any) => ({
  id: t.int({"required":false}),
  bio: t.string({"required":false}),
  userId: t.int({"required":true}),
});
export const ProfileCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileUncheckedCreateInput>>('ProfileCreateInput').implement({
  fields: ProfileCreateInputFields,
});

export const ProfileUpdateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":IntFieldUpdateOperationsInput}),
  bio: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  userId: t.field({"required":false,"type":IntFieldUpdateOperationsInput}),
});
export const ProfileUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileUncheckedUpdateInput>>('ProfileUpdateInput').implement({
  fields: ProfileUpdateInputFields,
});

export const ProfileUpdateManyMutationInputFields = (t: any) => ({
  bio: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
});
export const ProfileUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileUpdateManyMutationInput>>('ProfileUpdateManyMutationInput').implement({
  fields: ProfileUpdateManyMutationInputFields,
});

export const FollowCreateInputFields = (t: any) => ({
  fromId: t.int({"required":true}),
  toId: t.int({"required":true}),
});
export const FollowCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowUncheckedCreateInput>>('FollowCreateInput').implement({
  fields: FollowCreateInputFields,
});

export const FollowUpdateInputFields = (t: any) => ({
  fromId: t.field({"required":false,"type":IntFieldUpdateOperationsInput}),
  toId: t.field({"required":false,"type":IntFieldUpdateOperationsInput}),
});
export const FollowUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowUncheckedUpdateInput>>('FollowUpdateInput').implement({
  fields: FollowUpdateInputFields,
});

export const FollowUpdateManyMutationInputFields = (t: any) => ({
  _: t.field({ type: NEVER }),
});
export const FollowUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowUpdateManyMutationInput>>('FollowUpdateManyMutationInput').implement({
  fields: FollowUpdateManyMutationInputFields,
});

export const UnrelatedCreateInputFields = (t: any) => ({
  id: t.int({"required":false}),
  name: t.string({"required":false}),
});
export const UnrelatedCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UnrelatedUncheckedCreateInput>>('UnrelatedCreateInput').implement({
  fields: UnrelatedCreateInputFields,
});

export const UnrelatedUpdateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":IntFieldUpdateOperationsInput}),
  name: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
});
export const UnrelatedUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UnrelatedUncheckedUpdateInput>>('UnrelatedUpdateInput').implement({
  fields: UnrelatedUpdateInputFields,
});

export const UnrelatedUpdateManyMutationInputFields = (t: any) => ({
  name: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
});
export const UnrelatedUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UnrelatedUpdateManyMutationInput>>('UnrelatedUpdateManyMutationInput').implement({
  fields: UnrelatedUpdateManyMutationInputFields,
});

export const IdOnlyCreateInputFields = (t: any) => ({
  id: t.int({"required":false}),
});
export const IdOnlyCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IdOnlyUncheckedCreateInput>>('IdOnlyCreateInput').implement({
  fields: IdOnlyCreateInputFields,
});

export const IdOnlyUpdateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":IntFieldUpdateOperationsInput}),
});
export const IdOnlyUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IdOnlyUncheckedUpdateInput>>('IdOnlyUpdateInput').implement({
  fields: IdOnlyUpdateInputFields,
});

export const IdOnlyUpdateManyMutationInputFields = (t: any) => ({
  _: t.field({ type: NEVER }),
});
export const IdOnlyUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IdOnlyUpdateManyMutationInput>>('IdOnlyUpdateManyMutationInput').implement({
  fields: IdOnlyUpdateManyMutationInputFields,
});

export const WithoutIDCreateInputFields = (t: any) => ({
  name: t.string({"required":true}),
});
export const WithoutIDCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithoutIDUncheckedCreateInput>>('WithoutIDCreateInput').implement({
  fields: WithoutIDCreateInputFields,
});

export const WithoutIDUpdateInputFields = (t: any) => ({
  name: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
});
export const WithoutIDUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithoutIDUncheckedUpdateInput>>('WithoutIDUpdateInput').implement({
  fields: WithoutIDUpdateInputFields,
});

export const WithoutIDUpdateManyMutationInputFields = (t: any) => ({
  name: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
});
export const WithoutIDUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithoutIDUpdateManyMutationInput>>('WithoutIDUpdateManyMutationInput').implement({
  fields: WithoutIDUpdateManyMutationInputFields,
});

export const WithScalarsCreateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":Bigint}),
  string: t.string({"required":false}),
  boolean: t.boolean({"required":false}),
  int: t.int({"required":false}),
  float: t.float({"required":false}),
  decimal: t.field({"required":false,"type":Decimal}),
  bigint: t.field({"required":false,"type":Bigint}),
  datetime: t.field({"required":false,"type":DateTime}),
  bytes: t.field({"required":false,"type":Bytes}),
});
export const WithScalarsCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithScalarsUncheckedCreateInput>>('WithScalarsCreateInput').implement({
  fields: WithScalarsCreateInputFields,
});

export const WithScalarsUpdateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":BigIntFieldUpdateOperationsInput}),
  string: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  boolean: t.field({"required":false,"type":NullableBoolFieldUpdateOperationsInput}),
  int: t.field({"required":false,"type":NullableIntFieldUpdateOperationsInput}),
  float: t.field({"required":false,"type":NullableFloatFieldUpdateOperationsInput}),
  decimal: t.field({"required":false,"type":NullableDecimalFieldUpdateOperationsInput}),
  bigint: t.field({"required":false,"type":NullableBigIntFieldUpdateOperationsInput}),
  datetime: t.field({"required":false,"type":NullableDateTimeFieldUpdateOperationsInput}),
  bytes: t.field({"required":false,"type":NullableBytesFieldUpdateOperationsInput}),
});
export const WithScalarsUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithScalarsUncheckedUpdateInput>>('WithScalarsUpdateInput').implement({
  fields: WithScalarsUpdateInputFields,
});

export const WithScalarsUpdateManyMutationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":BigIntFieldUpdateOperationsInput}),
  string: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  boolean: t.field({"required":false,"type":NullableBoolFieldUpdateOperationsInput}),
  int: t.field({"required":false,"type":NullableIntFieldUpdateOperationsInput}),
  float: t.field({"required":false,"type":NullableFloatFieldUpdateOperationsInput}),
  decimal: t.field({"required":false,"type":NullableDecimalFieldUpdateOperationsInput}),
  bigint: t.field({"required":false,"type":NullableBigIntFieldUpdateOperationsInput}),
  datetime: t.field({"required":false,"type":NullableDateTimeFieldUpdateOperationsInput}),
  bytes: t.field({"required":false,"type":NullableBytesFieldUpdateOperationsInput}),
});
export const WithScalarsUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithScalarsUpdateManyMutationInput>>('WithScalarsUpdateManyMutationInput').implement({
  fields: WithScalarsUpdateManyMutationInputFields,
});

export const IntFilterFields = (t: any) => ({
  equals: t.int({"required":false}),
  in: t.intList({"required":false}),
  notIn: t.intList({"required":false}),
  lt: t.int({"required":false}),
  lte: t.int({"required":false}),
  gt: t.int({"required":false}),
  gte: t.int({"required":false}),
  not: t.field({"required":false,"type":NestedIntFilter}),
});
export const IntFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IntFilter>>('IntFilter').implement({
  fields: IntFilterFields,
});

export const StringFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  contains: t.string({"required":false}),
  startsWith: t.string({"required":false}),
  endsWith: t.string({"required":false}),
  not: t.field({"required":false,"type":NestedStringFilter}),
});
export const StringFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.StringFilter>>('StringFilter').implement({
  fields: StringFilterFields,
});

export const DateTimeFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":DateTime}),
  in: t.field({"required":false,"type":[DateTime]}),
  notIn: t.field({"required":false,"type":[DateTime]}),
  lt: t.field({"required":false,"type":DateTime}),
  lte: t.field({"required":false,"type":DateTime}),
  gt: t.field({"required":false,"type":DateTime}),
  gte: t.field({"required":false,"type":DateTime}),
  not: t.field({"required":false,"type":NestedDateTimeFilter}),
});
export const DateTimeFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.DateTimeFilter>>('DateTimeFilter').implement({
  fields: DateTimeFilterFields,
});

export const DateTimeNullableFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":DateTime}),
  in: t.field({"required":false,"type":[DateTime]}),
  notIn: t.field({"required":false,"type":[DateTime]}),
  lt: t.field({"required":false,"type":DateTime}),
  lte: t.field({"required":false,"type":DateTime}),
  gt: t.field({"required":false,"type":DateTime}),
  gte: t.field({"required":false,"type":DateTime}),
  not: t.field({"required":false,"type":NestedDateTimeNullableFilter}),
});
export const DateTimeNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.DateTimeNullableFilter>>('DateTimeNullableFilter').implement({
  fields: DateTimeNullableFilterFields,
});

export const PostListRelationFilterFields = (t: any) => ({
  every: t.field({"required":false,"type":PostWhereInput}),
  some: t.field({"required":false,"type":PostWhereInput}),
  none: t.field({"required":false,"type":PostWhereInput}),
});
export const PostListRelationFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostListRelationFilter>>('PostListRelationFilter').implement({
  fields: PostListRelationFilterFields,
});

export const CommentListRelationFilterFields = (t: any) => ({
  every: t.field({"required":false,"type":CommentWhereInput}),
  some: t.field({"required":false,"type":CommentWhereInput}),
  none: t.field({"required":false,"type":CommentWhereInput}),
});
export const CommentListRelationFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentListRelationFilter>>('CommentListRelationFilter').implement({
  fields: CommentListRelationFilterFields,
});

export const ProfileListRelationFilterFields = (t: any) => ({
  every: t.field({"required":false,"type":ProfileWhereInput}),
  some: t.field({"required":false,"type":ProfileWhereInput}),
  none: t.field({"required":false,"type":ProfileWhereInput}),
});
export const ProfileListRelationFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileListRelationFilter>>('ProfileListRelationFilter').implement({
  fields: ProfileListRelationFilterFields,
});

export const FollowListRelationFilterFields = (t: any) => ({
  every: t.field({"required":false,"type":FollowWhereInput}),
  some: t.field({"required":false,"type":FollowWhereInput}),
  none: t.field({"required":false,"type":FollowWhereInput}),
});
export const FollowListRelationFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowListRelationFilter>>('FollowListRelationFilter').implement({
  fields: FollowListRelationFilterFields,
});

export const PostOrderByRelationAggregateInputFields = (t: any) => ({
  _count: t.field({"required":false,"type":SortOrder}),
});
export const PostOrderByRelationAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostOrderByRelationAggregateInput>>('PostOrderByRelationAggregateInput').implement({
  fields: PostOrderByRelationAggregateInputFields,
});

export const CommentOrderByRelationAggregateInputFields = (t: any) => ({
  _count: t.field({"required":false,"type":SortOrder}),
});
export const CommentOrderByRelationAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentOrderByRelationAggregateInput>>('CommentOrderByRelationAggregateInput').implement({
  fields: CommentOrderByRelationAggregateInputFields,
});

export const ProfileOrderByRelationAggregateInputFields = (t: any) => ({
  _count: t.field({"required":false,"type":SortOrder}),
});
export const ProfileOrderByRelationAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileOrderByRelationAggregateInput>>('ProfileOrderByRelationAggregateInput').implement({
  fields: ProfileOrderByRelationAggregateInputFields,
});

export const FollowOrderByRelationAggregateInputFields = (t: any) => ({
  _count: t.field({"required":false,"type":SortOrder}),
});
export const FollowOrderByRelationAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowOrderByRelationAggregateInput>>('FollowOrderByRelationAggregateInput').implement({
  fields: FollowOrderByRelationAggregateInputFields,
});

export const IntWithAggregatesFilterFields = (t: any) => ({
  equals: t.int({"required":false}),
  in: t.intList({"required":false}),
  notIn: t.intList({"required":false}),
  lt: t.int({"required":false}),
  lte: t.int({"required":false}),
  gt: t.int({"required":false}),
  gte: t.int({"required":false}),
  not: t.field({"required":false,"type":NestedIntWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _avg: t.field({"required":false,"type":NestedFloatFilter}),
  _sum: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedIntFilter}),
  _max: t.field({"required":false,"type":NestedIntFilter}),
});
export const IntWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IntWithAggregatesFilter>>('IntWithAggregatesFilter').implement({
  fields: IntWithAggregatesFilterFields,
});

export const StringWithAggregatesFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  contains: t.string({"required":false}),
  startsWith: t.string({"required":false}),
  endsWith: t.string({"required":false}),
  not: t.field({"required":false,"type":NestedStringWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedStringFilter}),
  _max: t.field({"required":false,"type":NestedStringFilter}),
});
export const StringWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.StringWithAggregatesFilter>>('StringWithAggregatesFilter').implement({
  fields: StringWithAggregatesFilterFields,
});

export const DateTimeWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":DateTime}),
  in: t.field({"required":false,"type":[DateTime]}),
  notIn: t.field({"required":false,"type":[DateTime]}),
  lt: t.field({"required":false,"type":DateTime}),
  lte: t.field({"required":false,"type":DateTime}),
  gt: t.field({"required":false,"type":DateTime}),
  gte: t.field({"required":false,"type":DateTime}),
  not: t.field({"required":false,"type":NestedDateTimeWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedDateTimeFilter}),
  _max: t.field({"required":false,"type":NestedDateTimeFilter}),
});
export const DateTimeWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.DateTimeWithAggregatesFilter>>('DateTimeWithAggregatesFilter').implement({
  fields: DateTimeWithAggregatesFilterFields,
});

export const DateTimeNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":DateTime}),
  in: t.field({"required":false,"type":[DateTime]}),
  notIn: t.field({"required":false,"type":[DateTime]}),
  lt: t.field({"required":false,"type":DateTime}),
  lte: t.field({"required":false,"type":DateTime}),
  gt: t.field({"required":false,"type":DateTime}),
  gte: t.field({"required":false,"type":DateTime}),
  not: t.field({"required":false,"type":NestedDateTimeNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _min: t.field({"required":false,"type":NestedDateTimeNullableFilter}),
  _max: t.field({"required":false,"type":NestedDateTimeNullableFilter}),
});
export const DateTimeNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.DateTimeNullableWithAggregatesFilter>>('DateTimeNullableWithAggregatesFilter').implement({
  fields: DateTimeNullableWithAggregatesFilterFields,
});

export const UserRelationFilterFields = (t: any) => ({
  is: t.field({"required":false,"type":UserWhereInput}),
  isNot: t.field({"required":false,"type":UserWhereInput}),
});
export const UserRelationFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserRelationFilter>>('UserRelationFilter').implement({
  fields: UserRelationFilterFields,
});

export const PostRelationFilterFields = (t: any) => ({
  is: t.field({"required":false,"type":PostWhereInput}),
  isNot: t.field({"required":false,"type":PostWhereInput}),
});
export const PostRelationFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostRelationFilter>>('PostRelationFilter').implement({
  fields: PostRelationFilterFields,
});

export const StringNullableFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  contains: t.string({"required":false}),
  startsWith: t.string({"required":false}),
  endsWith: t.string({"required":false}),
  not: t.field({"required":false,"type":NestedStringNullableFilter}),
});
export const StringNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.StringNullableFilter>>('StringNullableFilter').implement({
  fields: StringNullableFilterFields,
});

export const StringNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  contains: t.string({"required":false}),
  startsWith: t.string({"required":false}),
  endsWith: t.string({"required":false}),
  not: t.field({"required":false,"type":NestedStringNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _min: t.field({"required":false,"type":NestedStringNullableFilter}),
  _max: t.field({"required":false,"type":NestedStringNullableFilter}),
});
export const StringNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.StringNullableWithAggregatesFilter>>('StringNullableWithAggregatesFilter').implement({
  fields: StringNullableWithAggregatesFilterFields,
});

export const FollowCompositeIDCompoundUniqueInputFields = (t: any) => ({
  fromId: t.int({"required":true}),
  toId: t.int({"required":true}),
});
export const FollowCompositeIDCompoundUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowCompositeIDCompoundUniqueInput>>('FollowCompositeIDCompoundUniqueInput').implement({
  fields: FollowCompositeIDCompoundUniqueInputFields,
});

export const BigIntFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Bigint}),
  in: t.field({"required":false,"type":[Bigint]}),
  notIn: t.field({"required":false,"type":[Bigint]}),
  lt: t.field({"required":false,"type":Bigint}),
  lte: t.field({"required":false,"type":Bigint}),
  gt: t.field({"required":false,"type":Bigint}),
  gte: t.field({"required":false,"type":Bigint}),
  not: t.field({"required":false,"type":NestedBigIntFilter}),
});
export const BigIntFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.BigIntFilter>>('BigIntFilter').implement({
  fields: BigIntFilterFields,
});

export const BoolNullableFilterFields = (t: any) => ({
  equals: t.boolean({"required":false}),
  not: t.field({"required":false,"type":NestedBoolNullableFilter}),
});
export const BoolNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.BoolNullableFilter>>('BoolNullableFilter').implement({
  fields: BoolNullableFilterFields,
});

export const IntNullableFilterFields = (t: any) => ({
  equals: t.int({"required":false}),
  in: t.intList({"required":false}),
  notIn: t.intList({"required":false}),
  lt: t.int({"required":false}),
  lte: t.int({"required":false}),
  gt: t.int({"required":false}),
  gte: t.int({"required":false}),
  not: t.field({"required":false,"type":NestedIntNullableFilter}),
});
export const IntNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IntNullableFilter>>('IntNullableFilter').implement({
  fields: IntNullableFilterFields,
});

export const FloatNullableFilterFields = (t: any) => ({
  equals: t.float({"required":false}),
  in: t.floatList({"required":false}),
  notIn: t.floatList({"required":false}),
  lt: t.float({"required":false}),
  lte: t.float({"required":false}),
  gt: t.float({"required":false}),
  gte: t.float({"required":false}),
  not: t.field({"required":false,"type":NestedFloatNullableFilter}),
});
export const FloatNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FloatNullableFilter>>('FloatNullableFilter').implement({
  fields: FloatNullableFilterFields,
});

export const DecimalNullableFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Decimal}),
  in: t.field({"required":false,"type":[Decimal]}),
  notIn: t.field({"required":false,"type":[Decimal]}),
  lt: t.field({"required":false,"type":Decimal}),
  lte: t.field({"required":false,"type":Decimal}),
  gt: t.field({"required":false,"type":Decimal}),
  gte: t.field({"required":false,"type":Decimal}),
  not: t.field({"required":false,"type":NestedDecimalNullableFilter}),
});
export const DecimalNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.DecimalNullableFilter>>('DecimalNullableFilter').implement({
  fields: DecimalNullableFilterFields,
});

export const BigIntNullableFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Bigint}),
  in: t.field({"required":false,"type":[Bigint]}),
  notIn: t.field({"required":false,"type":[Bigint]}),
  lt: t.field({"required":false,"type":Bigint}),
  lte: t.field({"required":false,"type":Bigint}),
  gt: t.field({"required":false,"type":Bigint}),
  gte: t.field({"required":false,"type":Bigint}),
  not: t.field({"required":false,"type":NestedBigIntNullableFilter}),
});
export const BigIntNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.BigIntNullableFilter>>('BigIntNullableFilter').implement({
  fields: BigIntNullableFilterFields,
});

export const BytesNullableFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Bytes}),
  in: t.field({"required":false,"type":[Bytes]}),
  notIn: t.field({"required":false,"type":[Bytes]}),
  not: t.field({"required":false,"type":NestedBytesNullableFilter}),
});
export const BytesNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.BytesNullableFilter>>('BytesNullableFilter').implement({
  fields: BytesNullableFilterFields,
});

export const BigIntWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Bigint}),
  in: t.field({"required":false,"type":[Bigint]}),
  notIn: t.field({"required":false,"type":[Bigint]}),
  lt: t.field({"required":false,"type":Bigint}),
  lte: t.field({"required":false,"type":Bigint}),
  gt: t.field({"required":false,"type":Bigint}),
  gte: t.field({"required":false,"type":Bigint}),
  not: t.field({"required":false,"type":NestedBigIntWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _avg: t.field({"required":false,"type":NestedFloatFilter}),
  _sum: t.field({"required":false,"type":NestedBigIntFilter}),
  _min: t.field({"required":false,"type":NestedBigIntFilter}),
  _max: t.field({"required":false,"type":NestedBigIntFilter}),
});
export const BigIntWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.BigIntWithAggregatesFilter>>('BigIntWithAggregatesFilter').implement({
  fields: BigIntWithAggregatesFilterFields,
});

export const BoolNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.boolean({"required":false}),
  not: t.field({"required":false,"type":NestedBoolNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _min: t.field({"required":false,"type":NestedBoolNullableFilter}),
  _max: t.field({"required":false,"type":NestedBoolNullableFilter}),
});
export const BoolNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.BoolNullableWithAggregatesFilter>>('BoolNullableWithAggregatesFilter').implement({
  fields: BoolNullableWithAggregatesFilterFields,
});

export const IntNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.int({"required":false}),
  in: t.intList({"required":false}),
  notIn: t.intList({"required":false}),
  lt: t.int({"required":false}),
  lte: t.int({"required":false}),
  gt: t.int({"required":false}),
  gte: t.int({"required":false}),
  not: t.field({"required":false,"type":NestedIntNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _avg: t.field({"required":false,"type":NestedFloatNullableFilter}),
  _sum: t.field({"required":false,"type":NestedIntNullableFilter}),
  _min: t.field({"required":false,"type":NestedIntNullableFilter}),
  _max: t.field({"required":false,"type":NestedIntNullableFilter}),
});
export const IntNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IntNullableWithAggregatesFilter>>('IntNullableWithAggregatesFilter').implement({
  fields: IntNullableWithAggregatesFilterFields,
});

export const FloatNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.float({"required":false}),
  in: t.floatList({"required":false}),
  notIn: t.floatList({"required":false}),
  lt: t.float({"required":false}),
  lte: t.float({"required":false}),
  gt: t.float({"required":false}),
  gte: t.float({"required":false}),
  not: t.field({"required":false,"type":NestedFloatNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _avg: t.field({"required":false,"type":NestedFloatNullableFilter}),
  _sum: t.field({"required":false,"type":NestedFloatNullableFilter}),
  _min: t.field({"required":false,"type":NestedFloatNullableFilter}),
  _max: t.field({"required":false,"type":NestedFloatNullableFilter}),
});
export const FloatNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FloatNullableWithAggregatesFilter>>('FloatNullableWithAggregatesFilter').implement({
  fields: FloatNullableWithAggregatesFilterFields,
});

export const DecimalNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Decimal}),
  in: t.field({"required":false,"type":[Decimal]}),
  notIn: t.field({"required":false,"type":[Decimal]}),
  lt: t.field({"required":false,"type":Decimal}),
  lte: t.field({"required":false,"type":Decimal}),
  gt: t.field({"required":false,"type":Decimal}),
  gte: t.field({"required":false,"type":Decimal}),
  not: t.field({"required":false,"type":NestedDecimalNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _avg: t.field({"required":false,"type":NestedDecimalNullableFilter}),
  _sum: t.field({"required":false,"type":NestedDecimalNullableFilter}),
  _min: t.field({"required":false,"type":NestedDecimalNullableFilter}),
  _max: t.field({"required":false,"type":NestedDecimalNullableFilter}),
});
export const DecimalNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.DecimalNullableWithAggregatesFilter>>('DecimalNullableWithAggregatesFilter').implement({
  fields: DecimalNullableWithAggregatesFilterFields,
});

export const BigIntNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Bigint}),
  in: t.field({"required":false,"type":[Bigint]}),
  notIn: t.field({"required":false,"type":[Bigint]}),
  lt: t.field({"required":false,"type":Bigint}),
  lte: t.field({"required":false,"type":Bigint}),
  gt: t.field({"required":false,"type":Bigint}),
  gte: t.field({"required":false,"type":Bigint}),
  not: t.field({"required":false,"type":NestedBigIntNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _avg: t.field({"required":false,"type":NestedFloatNullableFilter}),
  _sum: t.field({"required":false,"type":NestedBigIntNullableFilter}),
  _min: t.field({"required":false,"type":NestedBigIntNullableFilter}),
  _max: t.field({"required":false,"type":NestedBigIntNullableFilter}),
});
export const BigIntNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.BigIntNullableWithAggregatesFilter>>('BigIntNullableWithAggregatesFilter').implement({
  fields: BigIntNullableWithAggregatesFilterFields,
});

export const BytesNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Bytes}),
  in: t.field({"required":false,"type":[Bytes]}),
  notIn: t.field({"required":false,"type":[Bytes]}),
  not: t.field({"required":false,"type":NestedBytesNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _min: t.field({"required":false,"type":NestedBytesNullableFilter}),
  _max: t.field({"required":false,"type":NestedBytesNullableFilter}),
});
export const BytesNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.BytesNullableWithAggregatesFilter>>('BytesNullableWithAggregatesFilter').implement({
  fields: BytesNullableWithAggregatesFilterFields,
});

export const PostCreateNestedManyWithoutAuthorInputFields = (t: any) => ({
  connect: t.field({"required":false,"type":[PostWhereUniqueInput]}),
  // 'create' was omitted due to `simple mode: true` found in global config
  // 'connectOrCreate' was omitted due to `simple mode: true` found in global config
});
export const PostCreateNestedManyWithoutAuthorInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateNestedManyWithoutAuthorInput>>('PostCreateNestedManyWithoutAuthorInput').implement({
  fields: PostCreateNestedManyWithoutAuthorInputFields,
});

export const CommentCreateNestedManyWithoutAuthorInputFields = (t: any) => ({
  connect: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
  // 'create' was omitted due to `simple mode: true` found in global config
  // 'connectOrCreate' was omitted due to `simple mode: true` found in global config
});
export const CommentCreateNestedManyWithoutAuthorInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentCreateNestedManyWithoutAuthorInput>>('CommentCreateNestedManyWithoutAuthorInput').implement({
  fields: CommentCreateNestedManyWithoutAuthorInputFields,
});

export const ProfileCreateNestedManyWithoutUserInputFields = (t: any) => ({
  connect: t.field({"required":false,"type":[ProfileWhereUniqueInput]}),
  // 'create' was omitted due to `simple mode: true` found in global config
  // 'connectOrCreate' was omitted due to `simple mode: true` found in global config
});
export const ProfileCreateNestedManyWithoutUserInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileCreateNestedManyWithoutUserInput>>('ProfileCreateNestedManyWithoutUserInput').implement({
  fields: ProfileCreateNestedManyWithoutUserInputFields,
});

export const FollowCreateNestedManyWithoutToInputFields = (t: any) => ({
  connect: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
  // 'create' was omitted due to `simple mode: true` found in global config
  // 'connectOrCreate' was omitted due to `simple mode: true` found in global config
});
export const FollowCreateNestedManyWithoutToInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowCreateNestedManyWithoutToInput>>('FollowCreateNestedManyWithoutToInput').implement({
  fields: FollowCreateNestedManyWithoutToInputFields,
});

export const FollowCreateNestedManyWithoutFromInputFields = (t: any) => ({
  connect: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
  // 'create' was omitted due to `simple mode: true` found in global config
  // 'connectOrCreate' was omitted due to `simple mode: true` found in global config
});
export const FollowCreateNestedManyWithoutFromInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowCreateNestedManyWithoutFromInput>>('FollowCreateNestedManyWithoutFromInput').implement({
  fields: FollowCreateNestedManyWithoutFromInputFields,
});

export const StringFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.string({"required":false}),
});
export const StringFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.StringFieldUpdateOperationsInput>>('StringFieldUpdateOperationsInput').implement({
  fields: StringFieldUpdateOperationsInputFields,
});

export const DateTimeFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.field({"required":false,"type":DateTime}),
});
export const DateTimeFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.DateTimeFieldUpdateOperationsInput>>('DateTimeFieldUpdateOperationsInput').implement({
  fields: DateTimeFieldUpdateOperationsInputFields,
});

export const NullableDateTimeFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.field({"required":false,"type":DateTime}),
});
export const NullableDateTimeFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NullableDateTimeFieldUpdateOperationsInput>>('NullableDateTimeFieldUpdateOperationsInput').implement({
  fields: NullableDateTimeFieldUpdateOperationsInputFields,
});

export const PostUpdateManyWithoutAuthorNestedInputFields = (t: any) => ({
  set: t.field({"required":false,"type":[PostWhereUniqueInput]}),
  disconnect: t.field({"required":false,"type":[PostWhereUniqueInput]}),
  connect: t.field({"required":false,"type":[PostWhereUniqueInput]}),
  // 'create' was omitted due to `simple mode: true` found in global config
  // 'connectOrCreate' was omitted due to `simple mode: true` found in global config
  // 'upsert' was omitted due to `simple mode: true` found in global config
  // 'delete' was omitted due to `simple mode: true` found in global config
  // 'update' was omitted due to `simple mode: true` found in global config
  // 'updateMany' was omitted due to `simple mode: true` found in global config
  // 'deleteMany' was omitted due to `simple mode: true` found in global config
});
export const PostUpdateManyWithoutAuthorNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateManyWithoutAuthorNestedInput>>('PostUpdateManyWithoutAuthorNestedInput').implement({
  fields: PostUpdateManyWithoutAuthorNestedInputFields,
});

export const CommentUpdateManyWithoutAuthorNestedInputFields = (t: any) => ({
  set: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
  disconnect: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
  connect: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
  // 'create' was omitted due to `simple mode: true` found in global config
  // 'connectOrCreate' was omitted due to `simple mode: true` found in global config
  // 'upsert' was omitted due to `simple mode: true` found in global config
  // 'delete' was omitted due to `simple mode: true` found in global config
  // 'update' was omitted due to `simple mode: true` found in global config
  // 'updateMany' was omitted due to `simple mode: true` found in global config
  // 'deleteMany' was omitted due to `simple mode: true` found in global config
});
export const CommentUpdateManyWithoutAuthorNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentUpdateManyWithoutAuthorNestedInput>>('CommentUpdateManyWithoutAuthorNestedInput').implement({
  fields: CommentUpdateManyWithoutAuthorNestedInputFields,
});

export const ProfileUpdateManyWithoutUserNestedInputFields = (t: any) => ({
  set: t.field({"required":false,"type":[ProfileWhereUniqueInput]}),
  disconnect: t.field({"required":false,"type":[ProfileWhereUniqueInput]}),
  connect: t.field({"required":false,"type":[ProfileWhereUniqueInput]}),
  // 'create' was omitted due to `simple mode: true` found in global config
  // 'connectOrCreate' was omitted due to `simple mode: true` found in global config
  // 'upsert' was omitted due to `simple mode: true` found in global config
  // 'delete' was omitted due to `simple mode: true` found in global config
  // 'update' was omitted due to `simple mode: true` found in global config
  // 'updateMany' was omitted due to `simple mode: true` found in global config
  // 'deleteMany' was omitted due to `simple mode: true` found in global config
});
export const ProfileUpdateManyWithoutUserNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileUpdateManyWithoutUserNestedInput>>('ProfileUpdateManyWithoutUserNestedInput').implement({
  fields: ProfileUpdateManyWithoutUserNestedInputFields,
});

export const FollowUpdateManyWithoutToNestedInputFields = (t: any) => ({
  set: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
  disconnect: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
  connect: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
  // 'create' was omitted due to `simple mode: true` found in global config
  // 'connectOrCreate' was omitted due to `simple mode: true` found in global config
  // 'upsert' was omitted due to `simple mode: true` found in global config
  // 'delete' was omitted due to `simple mode: true` found in global config
  // 'update' was omitted due to `simple mode: true` found in global config
  // 'updateMany' was omitted due to `simple mode: true` found in global config
  // 'deleteMany' was omitted due to `simple mode: true` found in global config
});
export const FollowUpdateManyWithoutToNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowUpdateManyWithoutToNestedInput>>('FollowUpdateManyWithoutToNestedInput').implement({
  fields: FollowUpdateManyWithoutToNestedInputFields,
});

export const FollowUpdateManyWithoutFromNestedInputFields = (t: any) => ({
  set: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
  disconnect: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
  connect: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
  // 'create' was omitted due to `simple mode: true` found in global config
  // 'connectOrCreate' was omitted due to `simple mode: true` found in global config
  // 'upsert' was omitted due to `simple mode: true` found in global config
  // 'delete' was omitted due to `simple mode: true` found in global config
  // 'update' was omitted due to `simple mode: true` found in global config
  // 'updateMany' was omitted due to `simple mode: true` found in global config
  // 'deleteMany' was omitted due to `simple mode: true` found in global config
});
export const FollowUpdateManyWithoutFromNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowUpdateManyWithoutFromNestedInput>>('FollowUpdateManyWithoutFromNestedInput').implement({
  fields: FollowUpdateManyWithoutFromNestedInputFields,
});

export const IntFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.int({"required":false}),
  increment: t.int({"required":false}),
  decrement: t.int({"required":false}),
  multiply: t.int({"required":false}),
  divide: t.int({"required":false}),
});
export const IntFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IntFieldUpdateOperationsInput>>('IntFieldUpdateOperationsInput').implement({
  fields: IntFieldUpdateOperationsInputFields,
});

export const CommentCreateNestedManyWithoutPostInputFields = (t: any) => ({
  connect: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
  // 'create' was omitted due to `simple mode: true` found in global config
  // 'connectOrCreate' was omitted due to `simple mode: true` found in global config
});
export const CommentCreateNestedManyWithoutPostInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentCreateNestedManyWithoutPostInput>>('CommentCreateNestedManyWithoutPostInput').implement({
  fields: CommentCreateNestedManyWithoutPostInputFields,
});

export const CommentUpdateManyWithoutPostNestedInputFields = (t: any) => ({
  set: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
  disconnect: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
  connect: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
  // 'create' was omitted due to `simple mode: true` found in global config
  // 'connectOrCreate' was omitted due to `simple mode: true` found in global config
  // 'upsert' was omitted due to `simple mode: true` found in global config
  // 'delete' was omitted due to `simple mode: true` found in global config
  // 'update' was omitted due to `simple mode: true` found in global config
  // 'updateMany' was omitted due to `simple mode: true` found in global config
  // 'deleteMany' was omitted due to `simple mode: true` found in global config
});
export const CommentUpdateManyWithoutPostNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentUpdateManyWithoutPostNestedInput>>('CommentUpdateManyWithoutPostNestedInput').implement({
  fields: CommentUpdateManyWithoutPostNestedInputFields,
});

export const NullableStringFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.string({"required":false}),
});
export const NullableStringFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NullableStringFieldUpdateOperationsInput>>('NullableStringFieldUpdateOperationsInput').implement({
  fields: NullableStringFieldUpdateOperationsInputFields,
});

export const BigIntFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.field({"required":false,"type":Bigint}),
  increment: t.field({"required":false,"type":Bigint}),
  decrement: t.field({"required":false,"type":Bigint}),
  multiply: t.field({"required":false,"type":Bigint}),
  divide: t.field({"required":false,"type":Bigint}),
});
export const BigIntFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.BigIntFieldUpdateOperationsInput>>('BigIntFieldUpdateOperationsInput').implement({
  fields: BigIntFieldUpdateOperationsInputFields,
});

export const NullableBoolFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.boolean({"required":false}),
});
export const NullableBoolFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NullableBoolFieldUpdateOperationsInput>>('NullableBoolFieldUpdateOperationsInput').implement({
  fields: NullableBoolFieldUpdateOperationsInputFields,
});

export const NullableIntFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.int({"required":false}),
  increment: t.int({"required":false}),
  decrement: t.int({"required":false}),
  multiply: t.int({"required":false}),
  divide: t.int({"required":false}),
});
export const NullableIntFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NullableIntFieldUpdateOperationsInput>>('NullableIntFieldUpdateOperationsInput').implement({
  fields: NullableIntFieldUpdateOperationsInputFields,
});

export const NullableFloatFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.float({"required":false}),
  increment: t.float({"required":false}),
  decrement: t.float({"required":false}),
  multiply: t.float({"required":false}),
  divide: t.float({"required":false}),
});
export const NullableFloatFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NullableFloatFieldUpdateOperationsInput>>('NullableFloatFieldUpdateOperationsInput').implement({
  fields: NullableFloatFieldUpdateOperationsInputFields,
});

export const NullableDecimalFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.field({"required":false,"type":Decimal}),
  increment: t.field({"required":false,"type":Decimal}),
  decrement: t.field({"required":false,"type":Decimal}),
  multiply: t.field({"required":false,"type":Decimal}),
  divide: t.field({"required":false,"type":Decimal}),
});
export const NullableDecimalFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NullableDecimalFieldUpdateOperationsInput>>('NullableDecimalFieldUpdateOperationsInput').implement({
  fields: NullableDecimalFieldUpdateOperationsInputFields,
});

export const NullableBigIntFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.field({"required":false,"type":Bigint}),
  increment: t.field({"required":false,"type":Bigint}),
  decrement: t.field({"required":false,"type":Bigint}),
  multiply: t.field({"required":false,"type":Bigint}),
  divide: t.field({"required":false,"type":Bigint}),
});
export const NullableBigIntFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NullableBigIntFieldUpdateOperationsInput>>('NullableBigIntFieldUpdateOperationsInput').implement({
  fields: NullableBigIntFieldUpdateOperationsInputFields,
});

export const NullableBytesFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.field({"required":false,"type":Bytes}),
});
export const NullableBytesFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NullableBytesFieldUpdateOperationsInput>>('NullableBytesFieldUpdateOperationsInput').implement({
  fields: NullableBytesFieldUpdateOperationsInputFields,
});

export const NestedIntFilterFields = (t: any) => ({
  equals: t.int({"required":false}),
  in: t.intList({"required":false}),
  notIn: t.intList({"required":false}),
  lt: t.int({"required":false}),
  lte: t.int({"required":false}),
  gt: t.int({"required":false}),
  gte: t.int({"required":false}),
  not: t.field({"required":false,"type":NestedIntFilter}),
});
export const NestedIntFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedIntFilter>>('NestedIntFilter').implement({
  fields: NestedIntFilterFields,
});

export const NestedStringFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  contains: t.string({"required":false}),
  startsWith: t.string({"required":false}),
  endsWith: t.string({"required":false}),
  not: t.field({"required":false,"type":NestedStringFilter}),
});
export const NestedStringFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedStringFilter>>('NestedStringFilter').implement({
  fields: NestedStringFilterFields,
});

export const NestedDateTimeFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":DateTime}),
  in: t.field({"required":false,"type":[DateTime]}),
  notIn: t.field({"required":false,"type":[DateTime]}),
  lt: t.field({"required":false,"type":DateTime}),
  lte: t.field({"required":false,"type":DateTime}),
  gt: t.field({"required":false,"type":DateTime}),
  gte: t.field({"required":false,"type":DateTime}),
  not: t.field({"required":false,"type":NestedDateTimeFilter}),
});
export const NestedDateTimeFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedDateTimeFilter>>('NestedDateTimeFilter').implement({
  fields: NestedDateTimeFilterFields,
});

export const NestedDateTimeNullableFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":DateTime}),
  in: t.field({"required":false,"type":[DateTime]}),
  notIn: t.field({"required":false,"type":[DateTime]}),
  lt: t.field({"required":false,"type":DateTime}),
  lte: t.field({"required":false,"type":DateTime}),
  gt: t.field({"required":false,"type":DateTime}),
  gte: t.field({"required":false,"type":DateTime}),
  not: t.field({"required":false,"type":NestedDateTimeNullableFilter}),
});
export const NestedDateTimeNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedDateTimeNullableFilter>>('NestedDateTimeNullableFilter').implement({
  fields: NestedDateTimeNullableFilterFields,
});

export const NestedIntWithAggregatesFilterFields = (t: any) => ({
  equals: t.int({"required":false}),
  in: t.intList({"required":false}),
  notIn: t.intList({"required":false}),
  lt: t.int({"required":false}),
  lte: t.int({"required":false}),
  gt: t.int({"required":false}),
  gte: t.int({"required":false}),
  not: t.field({"required":false,"type":NestedIntWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _avg: t.field({"required":false,"type":NestedFloatFilter}),
  _sum: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedIntFilter}),
  _max: t.field({"required":false,"type":NestedIntFilter}),
});
export const NestedIntWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedIntWithAggregatesFilter>>('NestedIntWithAggregatesFilter').implement({
  fields: NestedIntWithAggregatesFilterFields,
});

export const NestedFloatFilterFields = (t: any) => ({
  equals: t.float({"required":false}),
  in: t.floatList({"required":false}),
  notIn: t.floatList({"required":false}),
  lt: t.float({"required":false}),
  lte: t.float({"required":false}),
  gt: t.float({"required":false}),
  gte: t.float({"required":false}),
  not: t.field({"required":false,"type":NestedFloatFilter}),
});
export const NestedFloatFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedFloatFilter>>('NestedFloatFilter').implement({
  fields: NestedFloatFilterFields,
});

export const NestedStringWithAggregatesFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  contains: t.string({"required":false}),
  startsWith: t.string({"required":false}),
  endsWith: t.string({"required":false}),
  not: t.field({"required":false,"type":NestedStringWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedStringFilter}),
  _max: t.field({"required":false,"type":NestedStringFilter}),
});
export const NestedStringWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedStringWithAggregatesFilter>>('NestedStringWithAggregatesFilter').implement({
  fields: NestedStringWithAggregatesFilterFields,
});

export const NestedDateTimeWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":DateTime}),
  in: t.field({"required":false,"type":[DateTime]}),
  notIn: t.field({"required":false,"type":[DateTime]}),
  lt: t.field({"required":false,"type":DateTime}),
  lte: t.field({"required":false,"type":DateTime}),
  gt: t.field({"required":false,"type":DateTime}),
  gte: t.field({"required":false,"type":DateTime}),
  not: t.field({"required":false,"type":NestedDateTimeWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedDateTimeFilter}),
  _max: t.field({"required":false,"type":NestedDateTimeFilter}),
});
export const NestedDateTimeWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedDateTimeWithAggregatesFilter>>('NestedDateTimeWithAggregatesFilter').implement({
  fields: NestedDateTimeWithAggregatesFilterFields,
});

export const NestedDateTimeNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":DateTime}),
  in: t.field({"required":false,"type":[DateTime]}),
  notIn: t.field({"required":false,"type":[DateTime]}),
  lt: t.field({"required":false,"type":DateTime}),
  lte: t.field({"required":false,"type":DateTime}),
  gt: t.field({"required":false,"type":DateTime}),
  gte: t.field({"required":false,"type":DateTime}),
  not: t.field({"required":false,"type":NestedDateTimeNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _min: t.field({"required":false,"type":NestedDateTimeNullableFilter}),
  _max: t.field({"required":false,"type":NestedDateTimeNullableFilter}),
});
export const NestedDateTimeNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedDateTimeNullableWithAggregatesFilter>>('NestedDateTimeNullableWithAggregatesFilter').implement({
  fields: NestedDateTimeNullableWithAggregatesFilterFields,
});

export const NestedIntNullableFilterFields = (t: any) => ({
  equals: t.int({"required":false}),
  in: t.intList({"required":false}),
  notIn: t.intList({"required":false}),
  lt: t.int({"required":false}),
  lte: t.int({"required":false}),
  gt: t.int({"required":false}),
  gte: t.int({"required":false}),
  not: t.field({"required":false,"type":NestedIntNullableFilter}),
});
export const NestedIntNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedIntNullableFilter>>('NestedIntNullableFilter').implement({
  fields: NestedIntNullableFilterFields,
});

export const NestedStringNullableFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  contains: t.string({"required":false}),
  startsWith: t.string({"required":false}),
  endsWith: t.string({"required":false}),
  not: t.field({"required":false,"type":NestedStringNullableFilter}),
});
export const NestedStringNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedStringNullableFilter>>('NestedStringNullableFilter').implement({
  fields: NestedStringNullableFilterFields,
});

export const NestedStringNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  contains: t.string({"required":false}),
  startsWith: t.string({"required":false}),
  endsWith: t.string({"required":false}),
  not: t.field({"required":false,"type":NestedStringNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _min: t.field({"required":false,"type":NestedStringNullableFilter}),
  _max: t.field({"required":false,"type":NestedStringNullableFilter}),
});
export const NestedStringNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedStringNullableWithAggregatesFilter>>('NestedStringNullableWithAggregatesFilter').implement({
  fields: NestedStringNullableWithAggregatesFilterFields,
});

export const NestedBigIntFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Bigint}),
  in: t.field({"required":false,"type":[Bigint]}),
  notIn: t.field({"required":false,"type":[Bigint]}),
  lt: t.field({"required":false,"type":Bigint}),
  lte: t.field({"required":false,"type":Bigint}),
  gt: t.field({"required":false,"type":Bigint}),
  gte: t.field({"required":false,"type":Bigint}),
  not: t.field({"required":false,"type":NestedBigIntFilter}),
});
export const NestedBigIntFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedBigIntFilter>>('NestedBigIntFilter').implement({
  fields: NestedBigIntFilterFields,
});

export const NestedBoolNullableFilterFields = (t: any) => ({
  equals: t.boolean({"required":false}),
  not: t.field({"required":false,"type":NestedBoolNullableFilter}),
});
export const NestedBoolNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedBoolNullableFilter>>('NestedBoolNullableFilter').implement({
  fields: NestedBoolNullableFilterFields,
});

export const NestedFloatNullableFilterFields = (t: any) => ({
  equals: t.float({"required":false}),
  in: t.floatList({"required":false}),
  notIn: t.floatList({"required":false}),
  lt: t.float({"required":false}),
  lte: t.float({"required":false}),
  gt: t.float({"required":false}),
  gte: t.float({"required":false}),
  not: t.field({"required":false,"type":NestedFloatNullableFilter}),
});
export const NestedFloatNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedFloatNullableFilter>>('NestedFloatNullableFilter').implement({
  fields: NestedFloatNullableFilterFields,
});

export const NestedDecimalNullableFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Decimal}),
  in: t.field({"required":false,"type":[Decimal]}),
  notIn: t.field({"required":false,"type":[Decimal]}),
  lt: t.field({"required":false,"type":Decimal}),
  lte: t.field({"required":false,"type":Decimal}),
  gt: t.field({"required":false,"type":Decimal}),
  gte: t.field({"required":false,"type":Decimal}),
  not: t.field({"required":false,"type":NestedDecimalNullableFilter}),
});
export const NestedDecimalNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedDecimalNullableFilter>>('NestedDecimalNullableFilter').implement({
  fields: NestedDecimalNullableFilterFields,
});

export const NestedBigIntNullableFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Bigint}),
  in: t.field({"required":false,"type":[Bigint]}),
  notIn: t.field({"required":false,"type":[Bigint]}),
  lt: t.field({"required":false,"type":Bigint}),
  lte: t.field({"required":false,"type":Bigint}),
  gt: t.field({"required":false,"type":Bigint}),
  gte: t.field({"required":false,"type":Bigint}),
  not: t.field({"required":false,"type":NestedBigIntNullableFilter}),
});
export const NestedBigIntNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedBigIntNullableFilter>>('NestedBigIntNullableFilter').implement({
  fields: NestedBigIntNullableFilterFields,
});

export const NestedBytesNullableFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Bytes}),
  in: t.field({"required":false,"type":[Bytes]}),
  notIn: t.field({"required":false,"type":[Bytes]}),
  not: t.field({"required":false,"type":NestedBytesNullableFilter}),
});
export const NestedBytesNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedBytesNullableFilter>>('NestedBytesNullableFilter').implement({
  fields: NestedBytesNullableFilterFields,
});

export const NestedBigIntWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Bigint}),
  in: t.field({"required":false,"type":[Bigint]}),
  notIn: t.field({"required":false,"type":[Bigint]}),
  lt: t.field({"required":false,"type":Bigint}),
  lte: t.field({"required":false,"type":Bigint}),
  gt: t.field({"required":false,"type":Bigint}),
  gte: t.field({"required":false,"type":Bigint}),
  not: t.field({"required":false,"type":NestedBigIntWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _avg: t.field({"required":false,"type":NestedFloatFilter}),
  _sum: t.field({"required":false,"type":NestedBigIntFilter}),
  _min: t.field({"required":false,"type":NestedBigIntFilter}),
  _max: t.field({"required":false,"type":NestedBigIntFilter}),
});
export const NestedBigIntWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedBigIntWithAggregatesFilter>>('NestedBigIntWithAggregatesFilter').implement({
  fields: NestedBigIntWithAggregatesFilterFields,
});

export const NestedBoolNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.boolean({"required":false}),
  not: t.field({"required":false,"type":NestedBoolNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _min: t.field({"required":false,"type":NestedBoolNullableFilter}),
  _max: t.field({"required":false,"type":NestedBoolNullableFilter}),
});
export const NestedBoolNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedBoolNullableWithAggregatesFilter>>('NestedBoolNullableWithAggregatesFilter').implement({
  fields: NestedBoolNullableWithAggregatesFilterFields,
});

export const NestedIntNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.int({"required":false}),
  in: t.intList({"required":false}),
  notIn: t.intList({"required":false}),
  lt: t.int({"required":false}),
  lte: t.int({"required":false}),
  gt: t.int({"required":false}),
  gte: t.int({"required":false}),
  not: t.field({"required":false,"type":NestedIntNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _avg: t.field({"required":false,"type":NestedFloatNullableFilter}),
  _sum: t.field({"required":false,"type":NestedIntNullableFilter}),
  _min: t.field({"required":false,"type":NestedIntNullableFilter}),
  _max: t.field({"required":false,"type":NestedIntNullableFilter}),
});
export const NestedIntNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedIntNullableWithAggregatesFilter>>('NestedIntNullableWithAggregatesFilter').implement({
  fields: NestedIntNullableWithAggregatesFilterFields,
});

export const NestedFloatNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.float({"required":false}),
  in: t.floatList({"required":false}),
  notIn: t.floatList({"required":false}),
  lt: t.float({"required":false}),
  lte: t.float({"required":false}),
  gt: t.float({"required":false}),
  gte: t.float({"required":false}),
  not: t.field({"required":false,"type":NestedFloatNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _avg: t.field({"required":false,"type":NestedFloatNullableFilter}),
  _sum: t.field({"required":false,"type":NestedFloatNullableFilter}),
  _min: t.field({"required":false,"type":NestedFloatNullableFilter}),
  _max: t.field({"required":false,"type":NestedFloatNullableFilter}),
});
export const NestedFloatNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedFloatNullableWithAggregatesFilter>>('NestedFloatNullableWithAggregatesFilter').implement({
  fields: NestedFloatNullableWithAggregatesFilterFields,
});

export const NestedDecimalNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Decimal}),
  in: t.field({"required":false,"type":[Decimal]}),
  notIn: t.field({"required":false,"type":[Decimal]}),
  lt: t.field({"required":false,"type":Decimal}),
  lte: t.field({"required":false,"type":Decimal}),
  gt: t.field({"required":false,"type":Decimal}),
  gte: t.field({"required":false,"type":Decimal}),
  not: t.field({"required":false,"type":NestedDecimalNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _avg: t.field({"required":false,"type":NestedDecimalNullableFilter}),
  _sum: t.field({"required":false,"type":NestedDecimalNullableFilter}),
  _min: t.field({"required":false,"type":NestedDecimalNullableFilter}),
  _max: t.field({"required":false,"type":NestedDecimalNullableFilter}),
});
export const NestedDecimalNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedDecimalNullableWithAggregatesFilter>>('NestedDecimalNullableWithAggregatesFilter').implement({
  fields: NestedDecimalNullableWithAggregatesFilterFields,
});

export const NestedBigIntNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Bigint}),
  in: t.field({"required":false,"type":[Bigint]}),
  notIn: t.field({"required":false,"type":[Bigint]}),
  lt: t.field({"required":false,"type":Bigint}),
  lte: t.field({"required":false,"type":Bigint}),
  gt: t.field({"required":false,"type":Bigint}),
  gte: t.field({"required":false,"type":Bigint}),
  not: t.field({"required":false,"type":NestedBigIntNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _avg: t.field({"required":false,"type":NestedFloatNullableFilter}),
  _sum: t.field({"required":false,"type":NestedBigIntNullableFilter}),
  _min: t.field({"required":false,"type":NestedBigIntNullableFilter}),
  _max: t.field({"required":false,"type":NestedBigIntNullableFilter}),
});
export const NestedBigIntNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedBigIntNullableWithAggregatesFilter>>('NestedBigIntNullableWithAggregatesFilter').implement({
  fields: NestedBigIntNullableWithAggregatesFilterFields,
});

export const NestedBytesNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Bytes}),
  in: t.field({"required":false,"type":[Bytes]}),
  notIn: t.field({"required":false,"type":[Bytes]}),
  not: t.field({"required":false,"type":NestedBytesNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _min: t.field({"required":false,"type":NestedBytesNullableFilter}),
  _max: t.field({"required":false,"type":NestedBytesNullableFilter}),
});
export const NestedBytesNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedBytesNullableWithAggregatesFilter>>('NestedBytesNullableWithAggregatesFilter').implement({
  fields: NestedBytesNullableWithAggregatesFilterFields,
});