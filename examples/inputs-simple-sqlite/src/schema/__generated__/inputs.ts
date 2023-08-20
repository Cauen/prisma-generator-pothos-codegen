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

export const CommentScalarFieldEnum = builder.enumType('CommentScalarFieldEnum', {
  values: ["id","comment","authorId","postId"] as const,
});

export const ExtraModalScalarFieldEnum = builder.enumType('ExtraModalScalarFieldEnum', {
  values: ["id","title","createdAt","updatedAt"] as const,
});

export const FollowScalarFieldEnum = builder.enumType('FollowScalarFieldEnum', {
  values: ["fromId","toId"] as const,
});

export const IdOnlyScalarFieldEnum = builder.enumType('IdOnlyScalarFieldEnum', {
  values: ["id"] as const,
});

export const PostScalarFieldEnum = builder.enumType('PostScalarFieldEnum', {
  values: ["id","title","content","authorId"] as const,
});

export const ProfileScalarFieldEnum = builder.enumType('ProfileScalarFieldEnum', {
  values: ["id","bio","userId"] as const,
});

export const SortOrder = builder.enumType('SortOrder', {
  values: ["asc","desc"] as const,
});

export const TransactionIsolationLevel = builder.enumType('TransactionIsolationLevel', {
  values: ["Serializable"] as const,
});

export const UnrelatedScalarFieldEnum = builder.enumType('UnrelatedScalarFieldEnum', {
  values: ["id","name"] as const,
});

export const UserScalarFieldEnum = builder.enumType('UserScalarFieldEnum', {
  values: ["id","firstName","lastName","birthdate","login","password","createdAt","updatedAt"] as const,
});

export const WithScalarsScalarFieldEnum = builder.enumType('WithScalarsScalarFieldEnum', {
  values: ["id","string","boolean","int","float","decimal","bigint","datetime","bytes"] as const,
});

export const WithoutIDScalarFieldEnum = builder.enumType('WithoutIDScalarFieldEnum', {
  values: ["name"] as const,
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
  Posts: t.field({"required":false,"type":PostListRelationFilter}),
  Comments: t.field({"required":false,"type":CommentListRelationFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeNullableFilter}),
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
  Posts: t.field({"required":false,"type":PostOrderByRelationAggregateInput}),
  Comments: t.field({"required":false,"type":CommentOrderByRelationAggregateInput}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
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
});
export const UserWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserWhereUniqueInput>>('UserWhereUniqueInput').implement({
  fields: UserWhereUniqueInputFields,
});

export const UserOrderByWithAggregationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  firstName: t.field({"required":false,"type":SortOrder}),
  lastName: t.field({"required":false,"type":SortOrder}),
  birthdate: t.field({"required":false,"type":SortOrder}),
  login: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  _count: t.field({"required":false,"type":UserCountOrderByAggregateInput}),
  _avg: t.field({"required":false,"type":UserAvgOrderByAggregateInput}),
  _max: t.field({"required":false,"type":UserMaxOrderByAggregateInput}),
  _min: t.field({"required":false,"type":UserMinOrderByAggregateInput}),
  _sum: t.field({"required":false,"type":UserSumOrderByAggregateInput}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
});
export const UserOrderByWithAggregationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserOrderByWithAggregationInput>>('UserOrderByWithAggregationInput').implement({
  fields: UserOrderByWithAggregationInputFields,
});

export const UserScalarWhereWithAggregatesInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[UserScalarWhereWithAggregatesInput]}),
  OR: t.field({"required":false,"type":[UserScalarWhereWithAggregatesInput]}),
  NOT: t.field({"required":false,"type":[UserScalarWhereWithAggregatesInput]}),
  id: t.field({"required":false,"type":IntWithAggregatesFilter}),
  firstName: t.field({"required":false,"type":StringWithAggregatesFilter}),
  lastName: t.field({"required":false,"type":StringWithAggregatesFilter}),
  birthdate: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
  login: t.field({"required":false,"type":StringWithAggregatesFilter}),
  createdAt: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeNullableWithAggregatesFilter}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
});
export const UserScalarWhereWithAggregatesInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserScalarWhereWithAggregatesInput>>('UserScalarWhereWithAggregatesInput').implement({
  fields: UserScalarWhereWithAggregatesInputFields,
});

export const PostWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[PostWhereInput]}),
  OR: t.field({"required":false,"type":[PostWhereInput]}),
  NOT: t.field({"required":false,"type":[PostWhereInput]}),
  id: t.field({"required":false,"type":IntFilter}),
  title: t.field({"required":false,"type":StringFilter}),
  content: t.field({"required":false,"type":StringFilter}),
  Author: t.field({"required":false,"type":UserWhereInput}),
  Comments: t.field({"required":false,"type":CommentListRelationFilter}),
  authorId: t.field({"required":false,"type":IntFilter}),
});
export const PostWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostWhereInput>>('PostWhereInput').implement({
  fields: PostWhereInputFields,
});

export const PostOrderByWithRelationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  title: t.field({"required":false,"type":SortOrder}),
  content: t.field({"required":false,"type":SortOrder}),
  Author: t.field({"required":false,"type":UserOrderByWithRelationInput}),
  Comments: t.field({"required":false,"type":CommentOrderByRelationAggregateInput}),
  authorId: t.field({"required":false,"type":SortOrder}),
});
export const PostOrderByWithRelationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostOrderByWithRelationInput>>('PostOrderByWithRelationInput').implement({
  fields: PostOrderByWithRelationInputFields,
});

export const PostWhereUniqueInputFields = (t: any) => ({
  id: t.int({"required":false}),
});
export const PostWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostWhereUniqueInput>>('PostWhereUniqueInput').implement({
  fields: PostWhereUniqueInputFields,
});

export const PostOrderByWithAggregationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  title: t.field({"required":false,"type":SortOrder}),
  content: t.field({"required":false,"type":SortOrder}),
  authorId: t.field({"required":false,"type":SortOrder}),
  _count: t.field({"required":false,"type":PostCountOrderByAggregateInput}),
  _avg: t.field({"required":false,"type":PostAvgOrderByAggregateInput}),
  _max: t.field({"required":false,"type":PostMaxOrderByAggregateInput}),
  _min: t.field({"required":false,"type":PostMinOrderByAggregateInput}),
  _sum: t.field({"required":false,"type":PostSumOrderByAggregateInput}),
});
export const PostOrderByWithAggregationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostOrderByWithAggregationInput>>('PostOrderByWithAggregationInput').implement({
  fields: PostOrderByWithAggregationInputFields,
});

export const PostScalarWhereWithAggregatesInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[PostScalarWhereWithAggregatesInput]}),
  OR: t.field({"required":false,"type":[PostScalarWhereWithAggregatesInput]}),
  NOT: t.field({"required":false,"type":[PostScalarWhereWithAggregatesInput]}),
  id: t.field({"required":false,"type":IntWithAggregatesFilter}),
  title: t.field({"required":false,"type":StringWithAggregatesFilter}),
  content: t.field({"required":false,"type":StringWithAggregatesFilter}),
  authorId: t.field({"required":false,"type":IntWithAggregatesFilter}),
});
export const PostScalarWhereWithAggregatesInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostScalarWhereWithAggregatesInput>>('PostScalarWhereWithAggregatesInput').implement({
  fields: PostScalarWhereWithAggregatesInputFields,
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
});
export const ExtraModalWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ExtraModalWhereUniqueInput>>('ExtraModalWhereUniqueInput').implement({
  fields: ExtraModalWhereUniqueInputFields,
});

export const ExtraModalOrderByWithAggregationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  title: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  _count: t.field({"required":false,"type":ExtraModalCountOrderByAggregateInput}),
  _avg: t.field({"required":false,"type":ExtraModalAvgOrderByAggregateInput}),
  _max: t.field({"required":false,"type":ExtraModalMaxOrderByAggregateInput}),
  _min: t.field({"required":false,"type":ExtraModalMinOrderByAggregateInput}),
  _sum: t.field({"required":false,"type":ExtraModalSumOrderByAggregateInput}),
});
export const ExtraModalOrderByWithAggregationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ExtraModalOrderByWithAggregationInput>>('ExtraModalOrderByWithAggregationInput').implement({
  fields: ExtraModalOrderByWithAggregationInputFields,
});

export const ExtraModalScalarWhereWithAggregatesInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[ExtraModalScalarWhereWithAggregatesInput]}),
  OR: t.field({"required":false,"type":[ExtraModalScalarWhereWithAggregatesInput]}),
  NOT: t.field({"required":false,"type":[ExtraModalScalarWhereWithAggregatesInput]}),
  id: t.field({"required":false,"type":IntWithAggregatesFilter}),
  title: t.field({"required":false,"type":StringWithAggregatesFilter}),
  createdAt: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeNullableWithAggregatesFilter}),
});
export const ExtraModalScalarWhereWithAggregatesInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ExtraModalScalarWhereWithAggregatesInput>>('ExtraModalScalarWhereWithAggregatesInput').implement({
  fields: ExtraModalScalarWhereWithAggregatesInputFields,
});

export const CommentWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[CommentWhereInput]}),
  OR: t.field({"required":false,"type":[CommentWhereInput]}),
  NOT: t.field({"required":false,"type":[CommentWhereInput]}),
  id: t.field({"required":false,"type":IntFilter}),
  comment: t.field({"required":false,"type":StringFilter}),
  Author: t.field({"required":false,"type":UserWhereInput}),
  Post: t.field({"required":false,"type":PostWhereInput}),
  authorId: t.field({"required":false,"type":IntFilter}),
  postId: t.field({"required":false,"type":IntFilter}),
});
export const CommentWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentWhereInput>>('CommentWhereInput').implement({
  fields: CommentWhereInputFields,
});

export const CommentOrderByWithRelationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  comment: t.field({"required":false,"type":SortOrder}),
  Author: t.field({"required":false,"type":UserOrderByWithRelationInput}),
  Post: t.field({"required":false,"type":PostOrderByWithRelationInput}),
  authorId: t.field({"required":false,"type":SortOrder}),
  postId: t.field({"required":false,"type":SortOrder}),
});
export const CommentOrderByWithRelationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentOrderByWithRelationInput>>('CommentOrderByWithRelationInput').implement({
  fields: CommentOrderByWithRelationInputFields,
});

export const CommentWhereUniqueInputFields = (t: any) => ({
  id: t.int({"required":false}),
});
export const CommentWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentWhereUniqueInput>>('CommentWhereUniqueInput').implement({
  fields: CommentWhereUniqueInputFields,
});

export const CommentOrderByWithAggregationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  comment: t.field({"required":false,"type":SortOrder}),
  authorId: t.field({"required":false,"type":SortOrder}),
  postId: t.field({"required":false,"type":SortOrder}),
  _count: t.field({"required":false,"type":CommentCountOrderByAggregateInput}),
  _avg: t.field({"required":false,"type":CommentAvgOrderByAggregateInput}),
  _max: t.field({"required":false,"type":CommentMaxOrderByAggregateInput}),
  _min: t.field({"required":false,"type":CommentMinOrderByAggregateInput}),
  _sum: t.field({"required":false,"type":CommentSumOrderByAggregateInput}),
});
export const CommentOrderByWithAggregationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentOrderByWithAggregationInput>>('CommentOrderByWithAggregationInput').implement({
  fields: CommentOrderByWithAggregationInputFields,
});

export const CommentScalarWhereWithAggregatesInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[CommentScalarWhereWithAggregatesInput]}),
  OR: t.field({"required":false,"type":[CommentScalarWhereWithAggregatesInput]}),
  NOT: t.field({"required":false,"type":[CommentScalarWhereWithAggregatesInput]}),
  id: t.field({"required":false,"type":IntWithAggregatesFilter}),
  comment: t.field({"required":false,"type":StringWithAggregatesFilter}),
  authorId: t.field({"required":false,"type":IntWithAggregatesFilter}),
  postId: t.field({"required":false,"type":IntWithAggregatesFilter}),
});
export const CommentScalarWhereWithAggregatesInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentScalarWhereWithAggregatesInput>>('CommentScalarWhereWithAggregatesInput').implement({
  fields: CommentScalarWhereWithAggregatesInputFields,
});

export const ProfileWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[ProfileWhereInput]}),
  OR: t.field({"required":false,"type":[ProfileWhereInput]}),
  NOT: t.field({"required":false,"type":[ProfileWhereInput]}),
  id: t.field({"required":false,"type":IntFilter}),
  bio: t.field({"required":false,"type":StringNullableFilter}),
  User: t.field({"required":false,"type":UserWhereInput}),
  userId: t.field({"required":false,"type":IntFilter}),
});
export const ProfileWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileWhereInput>>('ProfileWhereInput').implement({
  fields: ProfileWhereInputFields,
});

export const ProfileOrderByWithRelationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  bio: t.field({"required":false,"type":SortOrder}),
  User: t.field({"required":false,"type":UserOrderByWithRelationInput}),
  userId: t.field({"required":false,"type":SortOrder}),
});
export const ProfileOrderByWithRelationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileOrderByWithRelationInput>>('ProfileOrderByWithRelationInput').implement({
  fields: ProfileOrderByWithRelationInputFields,
});

export const ProfileWhereUniqueInputFields = (t: any) => ({
  id: t.int({"required":false}),
  userId: t.int({"required":false}),
});
export const ProfileWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileWhereUniqueInput>>('ProfileWhereUniqueInput').implement({
  fields: ProfileWhereUniqueInputFields,
});

export const ProfileOrderByWithAggregationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  bio: t.field({"required":false,"type":SortOrder}),
  userId: t.field({"required":false,"type":SortOrder}),
  _count: t.field({"required":false,"type":ProfileCountOrderByAggregateInput}),
  _avg: t.field({"required":false,"type":ProfileAvgOrderByAggregateInput}),
  _max: t.field({"required":false,"type":ProfileMaxOrderByAggregateInput}),
  _min: t.field({"required":false,"type":ProfileMinOrderByAggregateInput}),
  _sum: t.field({"required":false,"type":ProfileSumOrderByAggregateInput}),
});
export const ProfileOrderByWithAggregationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileOrderByWithAggregationInput>>('ProfileOrderByWithAggregationInput').implement({
  fields: ProfileOrderByWithAggregationInputFields,
});

export const ProfileScalarWhereWithAggregatesInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[ProfileScalarWhereWithAggregatesInput]}),
  OR: t.field({"required":false,"type":[ProfileScalarWhereWithAggregatesInput]}),
  NOT: t.field({"required":false,"type":[ProfileScalarWhereWithAggregatesInput]}),
  id: t.field({"required":false,"type":IntWithAggregatesFilter}),
  bio: t.field({"required":false,"type":StringNullableWithAggregatesFilter}),
  userId: t.field({"required":false,"type":IntWithAggregatesFilter}),
});
export const ProfileScalarWhereWithAggregatesInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileScalarWhereWithAggregatesInput>>('ProfileScalarWhereWithAggregatesInput').implement({
  fields: ProfileScalarWhereWithAggregatesInputFields,
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
});
export const FollowWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowWhereUniqueInput>>('FollowWhereUniqueInput').implement({
  fields: FollowWhereUniqueInputFields,
});

export const FollowOrderByWithAggregationInputFields = (t: any) => ({
  fromId: t.field({"required":false,"type":SortOrder}),
  toId: t.field({"required":false,"type":SortOrder}),
  _count: t.field({"required":false,"type":FollowCountOrderByAggregateInput}),
  _avg: t.field({"required":false,"type":FollowAvgOrderByAggregateInput}),
  _max: t.field({"required":false,"type":FollowMaxOrderByAggregateInput}),
  _min: t.field({"required":false,"type":FollowMinOrderByAggregateInput}),
  _sum: t.field({"required":false,"type":FollowSumOrderByAggregateInput}),
});
export const FollowOrderByWithAggregationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowOrderByWithAggregationInput>>('FollowOrderByWithAggregationInput').implement({
  fields: FollowOrderByWithAggregationInputFields,
});

export const FollowScalarWhereWithAggregatesInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[FollowScalarWhereWithAggregatesInput]}),
  OR: t.field({"required":false,"type":[FollowScalarWhereWithAggregatesInput]}),
  NOT: t.field({"required":false,"type":[FollowScalarWhereWithAggregatesInput]}),
  fromId: t.field({"required":false,"type":IntWithAggregatesFilter}),
  toId: t.field({"required":false,"type":IntWithAggregatesFilter}),
});
export const FollowScalarWhereWithAggregatesInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowScalarWhereWithAggregatesInput>>('FollowScalarWhereWithAggregatesInput').implement({
  fields: FollowScalarWhereWithAggregatesInputFields,
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
});
export const UnrelatedWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UnrelatedWhereUniqueInput>>('UnrelatedWhereUniqueInput').implement({
  fields: UnrelatedWhereUniqueInputFields,
});

export const UnrelatedOrderByWithAggregationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  name: t.field({"required":false,"type":SortOrder}),
  _count: t.field({"required":false,"type":UnrelatedCountOrderByAggregateInput}),
  _avg: t.field({"required":false,"type":UnrelatedAvgOrderByAggregateInput}),
  _max: t.field({"required":false,"type":UnrelatedMaxOrderByAggregateInput}),
  _min: t.field({"required":false,"type":UnrelatedMinOrderByAggregateInput}),
  _sum: t.field({"required":false,"type":UnrelatedSumOrderByAggregateInput}),
});
export const UnrelatedOrderByWithAggregationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UnrelatedOrderByWithAggregationInput>>('UnrelatedOrderByWithAggregationInput').implement({
  fields: UnrelatedOrderByWithAggregationInputFields,
});

export const UnrelatedScalarWhereWithAggregatesInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[UnrelatedScalarWhereWithAggregatesInput]}),
  OR: t.field({"required":false,"type":[UnrelatedScalarWhereWithAggregatesInput]}),
  NOT: t.field({"required":false,"type":[UnrelatedScalarWhereWithAggregatesInput]}),
  id: t.field({"required":false,"type":IntWithAggregatesFilter}),
  name: t.field({"required":false,"type":StringNullableWithAggregatesFilter}),
});
export const UnrelatedScalarWhereWithAggregatesInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UnrelatedScalarWhereWithAggregatesInput>>('UnrelatedScalarWhereWithAggregatesInput').implement({
  fields: UnrelatedScalarWhereWithAggregatesInputFields,
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
});
export const IdOnlyWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IdOnlyWhereUniqueInput>>('IdOnlyWhereUniqueInput').implement({
  fields: IdOnlyWhereUniqueInputFields,
});

export const IdOnlyOrderByWithAggregationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  _count: t.field({"required":false,"type":IdOnlyCountOrderByAggregateInput}),
  _avg: t.field({"required":false,"type":IdOnlyAvgOrderByAggregateInput}),
  _max: t.field({"required":false,"type":IdOnlyMaxOrderByAggregateInput}),
  _min: t.field({"required":false,"type":IdOnlyMinOrderByAggregateInput}),
  _sum: t.field({"required":false,"type":IdOnlySumOrderByAggregateInput}),
});
export const IdOnlyOrderByWithAggregationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IdOnlyOrderByWithAggregationInput>>('IdOnlyOrderByWithAggregationInput').implement({
  fields: IdOnlyOrderByWithAggregationInputFields,
});

export const IdOnlyScalarWhereWithAggregatesInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[IdOnlyScalarWhereWithAggregatesInput]}),
  OR: t.field({"required":false,"type":[IdOnlyScalarWhereWithAggregatesInput]}),
  NOT: t.field({"required":false,"type":[IdOnlyScalarWhereWithAggregatesInput]}),
  id: t.field({"required":false,"type":IntWithAggregatesFilter}),
});
export const IdOnlyScalarWhereWithAggregatesInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IdOnlyScalarWhereWithAggregatesInput>>('IdOnlyScalarWhereWithAggregatesInput').implement({
  fields: IdOnlyScalarWhereWithAggregatesInputFields,
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
});
export const WithoutIDWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithoutIDWhereUniqueInput>>('WithoutIDWhereUniqueInput').implement({
  fields: WithoutIDWhereUniqueInputFields,
});

export const WithoutIDOrderByWithAggregationInputFields = (t: any) => ({
  name: t.field({"required":false,"type":SortOrder}),
  _count: t.field({"required":false,"type":WithoutIDCountOrderByAggregateInput}),
  _max: t.field({"required":false,"type":WithoutIDMaxOrderByAggregateInput}),
  _min: t.field({"required":false,"type":WithoutIDMinOrderByAggregateInput}),
});
export const WithoutIDOrderByWithAggregationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithoutIDOrderByWithAggregationInput>>('WithoutIDOrderByWithAggregationInput').implement({
  fields: WithoutIDOrderByWithAggregationInputFields,
});

export const WithoutIDScalarWhereWithAggregatesInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[WithoutIDScalarWhereWithAggregatesInput]}),
  OR: t.field({"required":false,"type":[WithoutIDScalarWhereWithAggregatesInput]}),
  NOT: t.field({"required":false,"type":[WithoutIDScalarWhereWithAggregatesInput]}),
  name: t.field({"required":false,"type":StringWithAggregatesFilter}),
});
export const WithoutIDScalarWhereWithAggregatesInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithoutIDScalarWhereWithAggregatesInput>>('WithoutIDScalarWhereWithAggregatesInput').implement({
  fields: WithoutIDScalarWhereWithAggregatesInputFields,
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
});
export const WithScalarsWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithScalarsWhereUniqueInput>>('WithScalarsWhereUniqueInput').implement({
  fields: WithScalarsWhereUniqueInputFields,
});

export const WithScalarsOrderByWithAggregationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  string: t.field({"required":false,"type":SortOrder}),
  boolean: t.field({"required":false,"type":SortOrder}),
  int: t.field({"required":false,"type":SortOrder}),
  float: t.field({"required":false,"type":SortOrder}),
  decimal: t.field({"required":false,"type":SortOrder}),
  bigint: t.field({"required":false,"type":SortOrder}),
  datetime: t.field({"required":false,"type":SortOrder}),
  bytes: t.field({"required":false,"type":SortOrder}),
  _count: t.field({"required":false,"type":WithScalarsCountOrderByAggregateInput}),
  _avg: t.field({"required":false,"type":WithScalarsAvgOrderByAggregateInput}),
  _max: t.field({"required":false,"type":WithScalarsMaxOrderByAggregateInput}),
  _min: t.field({"required":false,"type":WithScalarsMinOrderByAggregateInput}),
  _sum: t.field({"required":false,"type":WithScalarsSumOrderByAggregateInput}),
});
export const WithScalarsOrderByWithAggregationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithScalarsOrderByWithAggregationInput>>('WithScalarsOrderByWithAggregationInput').implement({
  fields: WithScalarsOrderByWithAggregationInputFields,
});

export const WithScalarsScalarWhereWithAggregatesInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[WithScalarsScalarWhereWithAggregatesInput]}),
  OR: t.field({"required":false,"type":[WithScalarsScalarWhereWithAggregatesInput]}),
  NOT: t.field({"required":false,"type":[WithScalarsScalarWhereWithAggregatesInput]}),
  id: t.field({"required":false,"type":BigIntWithAggregatesFilter}),
  string: t.field({"required":false,"type":StringNullableWithAggregatesFilter}),
  boolean: t.field({"required":false,"type":BoolNullableWithAggregatesFilter}),
  int: t.field({"required":false,"type":IntNullableWithAggregatesFilter}),
  float: t.field({"required":false,"type":FloatNullableWithAggregatesFilter}),
  decimal: t.field({"required":false,"type":DecimalNullableWithAggregatesFilter}),
  bigint: t.field({"required":false,"type":BigIntNullableWithAggregatesFilter}),
  datetime: t.field({"required":false,"type":DateTimeNullableWithAggregatesFilter}),
  bytes: t.field({"required":false,"type":BytesNullableWithAggregatesFilter}),
});
export const WithScalarsScalarWhereWithAggregatesInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithScalarsScalarWhereWithAggregatesInput>>('WithScalarsScalarWhereWithAggregatesInput').implement({
  fields: WithScalarsScalarWhereWithAggregatesInputFields,
});

export const UserCreateInputFields = (t: any) => ({
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
export const UserCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateInput>>('UserCreateInput').implement({
  fields: UserCreateInputFields,
});

export const UserUpdateInputFields = (t: any) => ({
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
export const UserUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateInput>>('UserUpdateInput').implement({
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
  title: t.string({"required":true}),
  content: t.string({"required":true}),
  Author: t.field({"required":true,"type":UserCreateNestedOneWithoutPostsInput}),
  Comments: t.field({"required":false,"type":CommentCreateNestedManyWithoutPostInput}),
});
export const PostCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateInput>>('PostCreateInput').implement({
  fields: PostCreateInputFields,
});

export const PostUpdateInputFields = (t: any) => ({
  title: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  content: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  Author: t.field({"required":false,"type":UserUpdateOneRequiredWithoutPostsNestedInput}),
  Comments: t.field({"required":false,"type":CommentUpdateManyWithoutPostNestedInput}),
});
export const PostUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateInput>>('PostUpdateInput').implement({
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
  title: t.string({"required":true}),
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const ExtraModalCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ExtraModalCreateInput>>('ExtraModalCreateInput').implement({
  fields: ExtraModalCreateInputFields,
});

export const ExtraModalUpdateInputFields = (t: any) => ({
  title: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const ExtraModalUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ExtraModalUpdateInput>>('ExtraModalUpdateInput').implement({
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
  comment: t.string({"required":true}),
  Author: t.field({"required":true,"type":UserCreateNestedOneWithoutCommentsInput}),
  Post: t.field({"required":true,"type":PostCreateNestedOneWithoutCommentsInput}),
});
export const CommentCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentCreateInput>>('CommentCreateInput').implement({
  fields: CommentCreateInputFields,
});

export const CommentUpdateInputFields = (t: any) => ({
  comment: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  Author: t.field({"required":false,"type":UserUpdateOneRequiredWithoutCommentsNestedInput}),
  Post: t.field({"required":false,"type":PostUpdateOneRequiredWithoutCommentsNestedInput}),
});
export const CommentUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentUpdateInput>>('CommentUpdateInput').implement({
  fields: CommentUpdateInputFields,
});

export const CommentUpdateManyMutationInputFields = (t: any) => ({
  comment: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
});
export const CommentUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentUpdateManyMutationInput>>('CommentUpdateManyMutationInput').implement({
  fields: CommentUpdateManyMutationInputFields,
});

export const ProfileCreateInputFields = (t: any) => ({
  bio: t.string({"required":false}),
  User: t.field({"required":true,"type":UserCreateNestedOneWithoutProfileInput}),
});
export const ProfileCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileCreateInput>>('ProfileCreateInput').implement({
  fields: ProfileCreateInputFields,
});

export const ProfileUpdateInputFields = (t: any) => ({
  bio: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  User: t.field({"required":false,"type":UserUpdateOneRequiredWithoutProfileNestedInput}),
});
export const ProfileUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileUpdateInput>>('ProfileUpdateInput').implement({
  fields: ProfileUpdateInputFields,
});

export const ProfileUpdateManyMutationInputFields = (t: any) => ({
  bio: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
});
export const ProfileUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileUpdateManyMutationInput>>('ProfileUpdateManyMutationInput').implement({
  fields: ProfileUpdateManyMutationInputFields,
});

export const FollowCreateInputFields = (t: any) => ({
  From: t.field({"required":true,"type":UserCreateNestedOneWithoutFollowingInput}),
  To: t.field({"required":true,"type":UserCreateNestedOneWithoutFollowersInput}),
});
export const FollowCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowCreateInput>>('FollowCreateInput').implement({
  fields: FollowCreateInputFields,
});

export const FollowUpdateInputFields = (t: any) => ({
  From: t.field({"required":false,"type":UserUpdateOneRequiredWithoutFollowingNestedInput}),
  To: t.field({"required":false,"type":UserUpdateOneRequiredWithoutFollowersNestedInput}),
});
export const FollowUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowUpdateInput>>('FollowUpdateInput').implement({
  fields: FollowUpdateInputFields,
});

export const FollowUpdateManyMutationInputFields = (t: any) => ({
  _: t.field({ type: NEVER }),
});
export const FollowUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowUpdateManyMutationInput>>('FollowUpdateManyMutationInput').implement({
  fields: FollowUpdateManyMutationInputFields,
});

export const UnrelatedCreateInputFields = (t: any) => ({
  name: t.string({"required":false}),
});
export const UnrelatedCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UnrelatedCreateInput>>('UnrelatedCreateInput').implement({
  fields: UnrelatedCreateInputFields,
});

export const UnrelatedUpdateInputFields = (t: any) => ({
  name: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
});
export const UnrelatedUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UnrelatedUpdateInput>>('UnrelatedUpdateInput').implement({
  fields: UnrelatedUpdateInputFields,
});

export const UnrelatedUpdateManyMutationInputFields = (t: any) => ({
  name: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
});
export const UnrelatedUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UnrelatedUpdateManyMutationInput>>('UnrelatedUpdateManyMutationInput').implement({
  fields: UnrelatedUpdateManyMutationInputFields,
});

export const IdOnlyCreateInputFields = (t: any) => ({
  _: t.field({ type: NEVER }),
});
export const IdOnlyCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IdOnlyCreateInput>>('IdOnlyCreateInput').implement({
  fields: IdOnlyCreateInputFields,
});

export const IdOnlyUpdateInputFields = (t: any) => ({
  _: t.field({ type: NEVER }),
});
export const IdOnlyUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IdOnlyUpdateInput>>('IdOnlyUpdateInput').implement({
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
export const WithoutIDCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithoutIDCreateInput>>('WithoutIDCreateInput').implement({
  fields: WithoutIDCreateInputFields,
});

export const WithoutIDUpdateInputFields = (t: any) => ({
  name: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
});
export const WithoutIDUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithoutIDUpdateInput>>('WithoutIDUpdateInput').implement({
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
export const WithScalarsCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithScalarsCreateInput>>('WithScalarsCreateInput').implement({
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
export const WithScalarsUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithScalarsUpdateInput>>('WithScalarsUpdateInput').implement({
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

export const UserCountOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  firstName: t.field({"required":false,"type":SortOrder}),
  lastName: t.field({"required":false,"type":SortOrder}),
  birthdate: t.field({"required":false,"type":SortOrder}),
  login: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
});
export const UserCountOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCountOrderByAggregateInput>>('UserCountOrderByAggregateInput').implement({
  fields: UserCountOrderByAggregateInputFields,
});

export const UserAvgOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
});
export const UserAvgOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserAvgOrderByAggregateInput>>('UserAvgOrderByAggregateInput').implement({
  fields: UserAvgOrderByAggregateInputFields,
});

export const UserMaxOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  firstName: t.field({"required":false,"type":SortOrder}),
  lastName: t.field({"required":false,"type":SortOrder}),
  birthdate: t.field({"required":false,"type":SortOrder}),
  login: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
});
export const UserMaxOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserMaxOrderByAggregateInput>>('UserMaxOrderByAggregateInput').implement({
  fields: UserMaxOrderByAggregateInputFields,
});

export const UserMinOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  firstName: t.field({"required":false,"type":SortOrder}),
  lastName: t.field({"required":false,"type":SortOrder}),
  birthdate: t.field({"required":false,"type":SortOrder}),
  login: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
});
export const UserMinOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserMinOrderByAggregateInput>>('UserMinOrderByAggregateInput').implement({
  fields: UserMinOrderByAggregateInputFields,
});

export const UserSumOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
});
export const UserSumOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserSumOrderByAggregateInput>>('UserSumOrderByAggregateInput').implement({
  fields: UserSumOrderByAggregateInputFields,
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

export const PostCountOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  title: t.field({"required":false,"type":SortOrder}),
  content: t.field({"required":false,"type":SortOrder}),
  authorId: t.field({"required":false,"type":SortOrder}),
});
export const PostCountOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCountOrderByAggregateInput>>('PostCountOrderByAggregateInput').implement({
  fields: PostCountOrderByAggregateInputFields,
});

export const PostAvgOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  authorId: t.field({"required":false,"type":SortOrder}),
});
export const PostAvgOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostAvgOrderByAggregateInput>>('PostAvgOrderByAggregateInput').implement({
  fields: PostAvgOrderByAggregateInputFields,
});

export const PostMaxOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  title: t.field({"required":false,"type":SortOrder}),
  content: t.field({"required":false,"type":SortOrder}),
  authorId: t.field({"required":false,"type":SortOrder}),
});
export const PostMaxOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostMaxOrderByAggregateInput>>('PostMaxOrderByAggregateInput').implement({
  fields: PostMaxOrderByAggregateInputFields,
});

export const PostMinOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  title: t.field({"required":false,"type":SortOrder}),
  content: t.field({"required":false,"type":SortOrder}),
  authorId: t.field({"required":false,"type":SortOrder}),
});
export const PostMinOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostMinOrderByAggregateInput>>('PostMinOrderByAggregateInput').implement({
  fields: PostMinOrderByAggregateInputFields,
});

export const PostSumOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  authorId: t.field({"required":false,"type":SortOrder}),
});
export const PostSumOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostSumOrderByAggregateInput>>('PostSumOrderByAggregateInput').implement({
  fields: PostSumOrderByAggregateInputFields,
});

export const ExtraModalCountOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  title: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
});
export const ExtraModalCountOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ExtraModalCountOrderByAggregateInput>>('ExtraModalCountOrderByAggregateInput').implement({
  fields: ExtraModalCountOrderByAggregateInputFields,
});

export const ExtraModalAvgOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
});
export const ExtraModalAvgOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ExtraModalAvgOrderByAggregateInput>>('ExtraModalAvgOrderByAggregateInput').implement({
  fields: ExtraModalAvgOrderByAggregateInputFields,
});

export const ExtraModalMaxOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  title: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
});
export const ExtraModalMaxOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ExtraModalMaxOrderByAggregateInput>>('ExtraModalMaxOrderByAggregateInput').implement({
  fields: ExtraModalMaxOrderByAggregateInputFields,
});

export const ExtraModalMinOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  title: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
});
export const ExtraModalMinOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ExtraModalMinOrderByAggregateInput>>('ExtraModalMinOrderByAggregateInput').implement({
  fields: ExtraModalMinOrderByAggregateInputFields,
});

export const ExtraModalSumOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
});
export const ExtraModalSumOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ExtraModalSumOrderByAggregateInput>>('ExtraModalSumOrderByAggregateInput').implement({
  fields: ExtraModalSumOrderByAggregateInputFields,
});

export const PostRelationFilterFields = (t: any) => ({
  is: t.field({"required":false,"type":PostWhereInput}),
  isNot: t.field({"required":false,"type":PostWhereInput}),
});
export const PostRelationFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostRelationFilter>>('PostRelationFilter').implement({
  fields: PostRelationFilterFields,
});

export const CommentCountOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  comment: t.field({"required":false,"type":SortOrder}),
  authorId: t.field({"required":false,"type":SortOrder}),
  postId: t.field({"required":false,"type":SortOrder}),
});
export const CommentCountOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentCountOrderByAggregateInput>>('CommentCountOrderByAggregateInput').implement({
  fields: CommentCountOrderByAggregateInputFields,
});

export const CommentAvgOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  authorId: t.field({"required":false,"type":SortOrder}),
  postId: t.field({"required":false,"type":SortOrder}),
});
export const CommentAvgOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentAvgOrderByAggregateInput>>('CommentAvgOrderByAggregateInput').implement({
  fields: CommentAvgOrderByAggregateInputFields,
});

export const CommentMaxOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  comment: t.field({"required":false,"type":SortOrder}),
  authorId: t.field({"required":false,"type":SortOrder}),
  postId: t.field({"required":false,"type":SortOrder}),
});
export const CommentMaxOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentMaxOrderByAggregateInput>>('CommentMaxOrderByAggregateInput').implement({
  fields: CommentMaxOrderByAggregateInputFields,
});

export const CommentMinOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  comment: t.field({"required":false,"type":SortOrder}),
  authorId: t.field({"required":false,"type":SortOrder}),
  postId: t.field({"required":false,"type":SortOrder}),
});
export const CommentMinOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentMinOrderByAggregateInput>>('CommentMinOrderByAggregateInput').implement({
  fields: CommentMinOrderByAggregateInputFields,
});

export const CommentSumOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  authorId: t.field({"required":false,"type":SortOrder}),
  postId: t.field({"required":false,"type":SortOrder}),
});
export const CommentSumOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentSumOrderByAggregateInput>>('CommentSumOrderByAggregateInput').implement({
  fields: CommentSumOrderByAggregateInputFields,
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

export const ProfileCountOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  bio: t.field({"required":false,"type":SortOrder}),
  userId: t.field({"required":false,"type":SortOrder}),
});
export const ProfileCountOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileCountOrderByAggregateInput>>('ProfileCountOrderByAggregateInput').implement({
  fields: ProfileCountOrderByAggregateInputFields,
});

export const ProfileAvgOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  userId: t.field({"required":false,"type":SortOrder}),
});
export const ProfileAvgOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileAvgOrderByAggregateInput>>('ProfileAvgOrderByAggregateInput').implement({
  fields: ProfileAvgOrderByAggregateInputFields,
});

export const ProfileMaxOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  bio: t.field({"required":false,"type":SortOrder}),
  userId: t.field({"required":false,"type":SortOrder}),
});
export const ProfileMaxOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileMaxOrderByAggregateInput>>('ProfileMaxOrderByAggregateInput').implement({
  fields: ProfileMaxOrderByAggregateInputFields,
});

export const ProfileMinOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  bio: t.field({"required":false,"type":SortOrder}),
  userId: t.field({"required":false,"type":SortOrder}),
});
export const ProfileMinOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileMinOrderByAggregateInput>>('ProfileMinOrderByAggregateInput').implement({
  fields: ProfileMinOrderByAggregateInputFields,
});

export const ProfileSumOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  userId: t.field({"required":false,"type":SortOrder}),
});
export const ProfileSumOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileSumOrderByAggregateInput>>('ProfileSumOrderByAggregateInput').implement({
  fields: ProfileSumOrderByAggregateInputFields,
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

export const FollowCountOrderByAggregateInputFields = (t: any) => ({
  fromId: t.field({"required":false,"type":SortOrder}),
  toId: t.field({"required":false,"type":SortOrder}),
});
export const FollowCountOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowCountOrderByAggregateInput>>('FollowCountOrderByAggregateInput').implement({
  fields: FollowCountOrderByAggregateInputFields,
});

export const FollowAvgOrderByAggregateInputFields = (t: any) => ({
  fromId: t.field({"required":false,"type":SortOrder}),
  toId: t.field({"required":false,"type":SortOrder}),
});
export const FollowAvgOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowAvgOrderByAggregateInput>>('FollowAvgOrderByAggregateInput').implement({
  fields: FollowAvgOrderByAggregateInputFields,
});

export const FollowMaxOrderByAggregateInputFields = (t: any) => ({
  fromId: t.field({"required":false,"type":SortOrder}),
  toId: t.field({"required":false,"type":SortOrder}),
});
export const FollowMaxOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowMaxOrderByAggregateInput>>('FollowMaxOrderByAggregateInput').implement({
  fields: FollowMaxOrderByAggregateInputFields,
});

export const FollowMinOrderByAggregateInputFields = (t: any) => ({
  fromId: t.field({"required":false,"type":SortOrder}),
  toId: t.field({"required":false,"type":SortOrder}),
});
export const FollowMinOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowMinOrderByAggregateInput>>('FollowMinOrderByAggregateInput').implement({
  fields: FollowMinOrderByAggregateInputFields,
});

export const FollowSumOrderByAggregateInputFields = (t: any) => ({
  fromId: t.field({"required":false,"type":SortOrder}),
  toId: t.field({"required":false,"type":SortOrder}),
});
export const FollowSumOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowSumOrderByAggregateInput>>('FollowSumOrderByAggregateInput').implement({
  fields: FollowSumOrderByAggregateInputFields,
});

export const UnrelatedCountOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  name: t.field({"required":false,"type":SortOrder}),
});
export const UnrelatedCountOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UnrelatedCountOrderByAggregateInput>>('UnrelatedCountOrderByAggregateInput').implement({
  fields: UnrelatedCountOrderByAggregateInputFields,
});

export const UnrelatedAvgOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
});
export const UnrelatedAvgOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UnrelatedAvgOrderByAggregateInput>>('UnrelatedAvgOrderByAggregateInput').implement({
  fields: UnrelatedAvgOrderByAggregateInputFields,
});

export const UnrelatedMaxOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  name: t.field({"required":false,"type":SortOrder}),
});
export const UnrelatedMaxOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UnrelatedMaxOrderByAggregateInput>>('UnrelatedMaxOrderByAggregateInput').implement({
  fields: UnrelatedMaxOrderByAggregateInputFields,
});

export const UnrelatedMinOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  name: t.field({"required":false,"type":SortOrder}),
});
export const UnrelatedMinOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UnrelatedMinOrderByAggregateInput>>('UnrelatedMinOrderByAggregateInput').implement({
  fields: UnrelatedMinOrderByAggregateInputFields,
});

export const UnrelatedSumOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
});
export const UnrelatedSumOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UnrelatedSumOrderByAggregateInput>>('UnrelatedSumOrderByAggregateInput').implement({
  fields: UnrelatedSumOrderByAggregateInputFields,
});

export const IdOnlyCountOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
});
export const IdOnlyCountOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IdOnlyCountOrderByAggregateInput>>('IdOnlyCountOrderByAggregateInput').implement({
  fields: IdOnlyCountOrderByAggregateInputFields,
});

export const IdOnlyAvgOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
});
export const IdOnlyAvgOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IdOnlyAvgOrderByAggregateInput>>('IdOnlyAvgOrderByAggregateInput').implement({
  fields: IdOnlyAvgOrderByAggregateInputFields,
});

export const IdOnlyMaxOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
});
export const IdOnlyMaxOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IdOnlyMaxOrderByAggregateInput>>('IdOnlyMaxOrderByAggregateInput').implement({
  fields: IdOnlyMaxOrderByAggregateInputFields,
});

export const IdOnlyMinOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
});
export const IdOnlyMinOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IdOnlyMinOrderByAggregateInput>>('IdOnlyMinOrderByAggregateInput').implement({
  fields: IdOnlyMinOrderByAggregateInputFields,
});

export const IdOnlySumOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
});
export const IdOnlySumOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IdOnlySumOrderByAggregateInput>>('IdOnlySumOrderByAggregateInput').implement({
  fields: IdOnlySumOrderByAggregateInputFields,
});

export const WithoutIDCountOrderByAggregateInputFields = (t: any) => ({
  name: t.field({"required":false,"type":SortOrder}),
});
export const WithoutIDCountOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithoutIDCountOrderByAggregateInput>>('WithoutIDCountOrderByAggregateInput').implement({
  fields: WithoutIDCountOrderByAggregateInputFields,
});

export const WithoutIDMaxOrderByAggregateInputFields = (t: any) => ({
  name: t.field({"required":false,"type":SortOrder}),
});
export const WithoutIDMaxOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithoutIDMaxOrderByAggregateInput>>('WithoutIDMaxOrderByAggregateInput').implement({
  fields: WithoutIDMaxOrderByAggregateInputFields,
});

export const WithoutIDMinOrderByAggregateInputFields = (t: any) => ({
  name: t.field({"required":false,"type":SortOrder}),
});
export const WithoutIDMinOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithoutIDMinOrderByAggregateInput>>('WithoutIDMinOrderByAggregateInput').implement({
  fields: WithoutIDMinOrderByAggregateInputFields,
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

export const WithScalarsCountOrderByAggregateInputFields = (t: any) => ({
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
export const WithScalarsCountOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithScalarsCountOrderByAggregateInput>>('WithScalarsCountOrderByAggregateInput').implement({
  fields: WithScalarsCountOrderByAggregateInputFields,
});

export const WithScalarsAvgOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  int: t.field({"required":false,"type":SortOrder}),
  float: t.field({"required":false,"type":SortOrder}),
  decimal: t.field({"required":false,"type":SortOrder}),
  bigint: t.field({"required":false,"type":SortOrder}),
});
export const WithScalarsAvgOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithScalarsAvgOrderByAggregateInput>>('WithScalarsAvgOrderByAggregateInput').implement({
  fields: WithScalarsAvgOrderByAggregateInputFields,
});

export const WithScalarsMaxOrderByAggregateInputFields = (t: any) => ({
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
export const WithScalarsMaxOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithScalarsMaxOrderByAggregateInput>>('WithScalarsMaxOrderByAggregateInput').implement({
  fields: WithScalarsMaxOrderByAggregateInputFields,
});

export const WithScalarsMinOrderByAggregateInputFields = (t: any) => ({
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
export const WithScalarsMinOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithScalarsMinOrderByAggregateInput>>('WithScalarsMinOrderByAggregateInput').implement({
  fields: WithScalarsMinOrderByAggregateInputFields,
});

export const WithScalarsSumOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  int: t.field({"required":false,"type":SortOrder}),
  float: t.field({"required":false,"type":SortOrder}),
  decimal: t.field({"required":false,"type":SortOrder}),
  bigint: t.field({"required":false,"type":SortOrder}),
});
export const WithScalarsSumOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.WithScalarsSumOrderByAggregateInput>>('WithScalarsSumOrderByAggregateInput').implement({
  fields: WithScalarsSumOrderByAggregateInputFields,
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
  create: t.field({"required":false,"type":[PostCreateWithoutAuthorInput]}),
  connectOrCreate: t.field({"required":false,"type":[PostCreateOrConnectWithoutAuthorInput]}),
  connect: t.field({"required":false,"type":[PostWhereUniqueInput]}),
});
export const PostCreateNestedManyWithoutAuthorInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateNestedManyWithoutAuthorInput>>('PostCreateNestedManyWithoutAuthorInput').implement({
  fields: PostCreateNestedManyWithoutAuthorInputFields,
});

export const CommentCreateNestedManyWithoutAuthorInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[CommentCreateWithoutAuthorInput]}),
  connectOrCreate: t.field({"required":false,"type":[CommentCreateOrConnectWithoutAuthorInput]}),
  connect: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
});
export const CommentCreateNestedManyWithoutAuthorInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentCreateNestedManyWithoutAuthorInput>>('CommentCreateNestedManyWithoutAuthorInput').implement({
  fields: CommentCreateNestedManyWithoutAuthorInputFields,
});

export const ProfileCreateNestedManyWithoutUserInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[ProfileCreateWithoutUserInput]}),
  connectOrCreate: t.field({"required":false,"type":[ProfileCreateOrConnectWithoutUserInput]}),
  connect: t.field({"required":false,"type":[ProfileWhereUniqueInput]}),
});
export const ProfileCreateNestedManyWithoutUserInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileCreateNestedManyWithoutUserInput>>('ProfileCreateNestedManyWithoutUserInput').implement({
  fields: ProfileCreateNestedManyWithoutUserInputFields,
});

export const FollowCreateNestedManyWithoutToInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[FollowCreateWithoutToInput]}),
  connectOrCreate: t.field({"required":false,"type":[FollowCreateOrConnectWithoutToInput]}),
  connect: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
});
export const FollowCreateNestedManyWithoutToInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowCreateNestedManyWithoutToInput>>('FollowCreateNestedManyWithoutToInput').implement({
  fields: FollowCreateNestedManyWithoutToInputFields,
});

export const FollowCreateNestedManyWithoutFromInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[FollowCreateWithoutFromInput]}),
  connectOrCreate: t.field({"required":false,"type":[FollowCreateOrConnectWithoutFromInput]}),
  connect: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
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

export const PostUpdateManyWithoutAuthorNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[PostCreateWithoutAuthorInput]}),
  connectOrCreate: t.field({"required":false,"type":[PostCreateOrConnectWithoutAuthorInput]}),
  upsert: t.field({"required":false,"type":[PostUpsertWithWhereUniqueWithoutAuthorInput]}),
  set: t.field({"required":false,"type":[PostWhereUniqueInput]}),
  disconnect: t.field({"required":false,"type":[PostWhereUniqueInput]}),
  delete: t.field({"required":false,"type":[PostWhereUniqueInput]}),
  connect: t.field({"required":false,"type":[PostWhereUniqueInput]}),
  update: t.field({"required":false,"type":[PostUpdateWithWhereUniqueWithoutAuthorInput]}),
  updateMany: t.field({"required":false,"type":[PostUpdateManyWithWhereWithoutAuthorInput]}),
  deleteMany: t.field({"required":false,"type":[PostScalarWhereInput]}),
});
export const PostUpdateManyWithoutAuthorNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateManyWithoutAuthorNestedInput>>('PostUpdateManyWithoutAuthorNestedInput').implement({
  fields: PostUpdateManyWithoutAuthorNestedInputFields,
});

export const CommentUpdateManyWithoutAuthorNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[CommentCreateWithoutAuthorInput]}),
  connectOrCreate: t.field({"required":false,"type":[CommentCreateOrConnectWithoutAuthorInput]}),
  upsert: t.field({"required":false,"type":[CommentUpsertWithWhereUniqueWithoutAuthorInput]}),
  set: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
  disconnect: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
  delete: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
  connect: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
  update: t.field({"required":false,"type":[CommentUpdateWithWhereUniqueWithoutAuthorInput]}),
  updateMany: t.field({"required":false,"type":[CommentUpdateManyWithWhereWithoutAuthorInput]}),
  deleteMany: t.field({"required":false,"type":[CommentScalarWhereInput]}),
});
export const CommentUpdateManyWithoutAuthorNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentUpdateManyWithoutAuthorNestedInput>>('CommentUpdateManyWithoutAuthorNestedInput').implement({
  fields: CommentUpdateManyWithoutAuthorNestedInputFields,
});

export const NullableDateTimeFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.field({"required":false,"type":DateTime}),
});
export const NullableDateTimeFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NullableDateTimeFieldUpdateOperationsInput>>('NullableDateTimeFieldUpdateOperationsInput').implement({
  fields: NullableDateTimeFieldUpdateOperationsInputFields,
});

export const ProfileUpdateManyWithoutUserNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[ProfileCreateWithoutUserInput]}),
  connectOrCreate: t.field({"required":false,"type":[ProfileCreateOrConnectWithoutUserInput]}),
  upsert: t.field({"required":false,"type":[ProfileUpsertWithWhereUniqueWithoutUserInput]}),
  set: t.field({"required":false,"type":[ProfileWhereUniqueInput]}),
  disconnect: t.field({"required":false,"type":[ProfileWhereUniqueInput]}),
  delete: t.field({"required":false,"type":[ProfileWhereUniqueInput]}),
  connect: t.field({"required":false,"type":[ProfileWhereUniqueInput]}),
  update: t.field({"required":false,"type":[ProfileUpdateWithWhereUniqueWithoutUserInput]}),
  updateMany: t.field({"required":false,"type":[ProfileUpdateManyWithWhereWithoutUserInput]}),
  deleteMany: t.field({"required":false,"type":[ProfileScalarWhereInput]}),
});
export const ProfileUpdateManyWithoutUserNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileUpdateManyWithoutUserNestedInput>>('ProfileUpdateManyWithoutUserNestedInput').implement({
  fields: ProfileUpdateManyWithoutUserNestedInputFields,
});

export const FollowUpdateManyWithoutToNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[FollowCreateWithoutToInput]}),
  connectOrCreate: t.field({"required":false,"type":[FollowCreateOrConnectWithoutToInput]}),
  upsert: t.field({"required":false,"type":[FollowUpsertWithWhereUniqueWithoutToInput]}),
  set: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
  disconnect: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
  delete: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
  connect: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
  update: t.field({"required":false,"type":[FollowUpdateWithWhereUniqueWithoutToInput]}),
  updateMany: t.field({"required":false,"type":[FollowUpdateManyWithWhereWithoutToInput]}),
  deleteMany: t.field({"required":false,"type":[FollowScalarWhereInput]}),
});
export const FollowUpdateManyWithoutToNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowUpdateManyWithoutToNestedInput>>('FollowUpdateManyWithoutToNestedInput').implement({
  fields: FollowUpdateManyWithoutToNestedInputFields,
});

export const FollowUpdateManyWithoutFromNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[FollowCreateWithoutFromInput]}),
  connectOrCreate: t.field({"required":false,"type":[FollowCreateOrConnectWithoutFromInput]}),
  upsert: t.field({"required":false,"type":[FollowUpsertWithWhereUniqueWithoutFromInput]}),
  set: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
  disconnect: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
  delete: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
  connect: t.field({"required":false,"type":[FollowWhereUniqueInput]}),
  update: t.field({"required":false,"type":[FollowUpdateWithWhereUniqueWithoutFromInput]}),
  updateMany: t.field({"required":false,"type":[FollowUpdateManyWithWhereWithoutFromInput]}),
  deleteMany: t.field({"required":false,"type":[FollowScalarWhereInput]}),
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

export const UserCreateNestedOneWithoutPostsInputFields = (t: any) => ({
  create: t.field({"required":false,"type":UserCreateWithoutPostsInput}),
  connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutPostsInput}),
  connect: t.field({"required":false,"type":UserWhereUniqueInput}),
});
export const UserCreateNestedOneWithoutPostsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateNestedOneWithoutPostsInput>>('UserCreateNestedOneWithoutPostsInput').implement({
  fields: UserCreateNestedOneWithoutPostsInputFields,
});

export const CommentCreateNestedManyWithoutPostInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[CommentCreateWithoutPostInput]}),
  connectOrCreate: t.field({"required":false,"type":[CommentCreateOrConnectWithoutPostInput]}),
  connect: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
});
export const CommentCreateNestedManyWithoutPostInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentCreateNestedManyWithoutPostInput>>('CommentCreateNestedManyWithoutPostInput').implement({
  fields: CommentCreateNestedManyWithoutPostInputFields,
});

export const UserUpdateOneRequiredWithoutPostsNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":UserCreateWithoutPostsInput}),
  connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutPostsInput}),
  upsert: t.field({"required":false,"type":UserUpsertWithoutPostsInput}),
  connect: t.field({"required":false,"type":UserWhereUniqueInput}),
  update: t.field({"required":false,"type":UserUpdateWithoutPostsInput}),
});
export const UserUpdateOneRequiredWithoutPostsNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateOneRequiredWithoutPostsNestedInput>>('UserUpdateOneRequiredWithoutPostsNestedInput').implement({
  fields: UserUpdateOneRequiredWithoutPostsNestedInputFields,
});

export const CommentUpdateManyWithoutPostNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[CommentCreateWithoutPostInput]}),
  connectOrCreate: t.field({"required":false,"type":[CommentCreateOrConnectWithoutPostInput]}),
  upsert: t.field({"required":false,"type":[CommentUpsertWithWhereUniqueWithoutPostInput]}),
  set: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
  disconnect: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
  delete: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
  connect: t.field({"required":false,"type":[CommentWhereUniqueInput]}),
  update: t.field({"required":false,"type":[CommentUpdateWithWhereUniqueWithoutPostInput]}),
  updateMany: t.field({"required":false,"type":[CommentUpdateManyWithWhereWithoutPostInput]}),
  deleteMany: t.field({"required":false,"type":[CommentScalarWhereInput]}),
});
export const CommentUpdateManyWithoutPostNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentUpdateManyWithoutPostNestedInput>>('CommentUpdateManyWithoutPostNestedInput').implement({
  fields: CommentUpdateManyWithoutPostNestedInputFields,
});

export const UserCreateNestedOneWithoutCommentsInputFields = (t: any) => ({
  create: t.field({"required":false,"type":UserCreateWithoutCommentsInput}),
  connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutCommentsInput}),
  connect: t.field({"required":false,"type":UserWhereUniqueInput}),
});
export const UserCreateNestedOneWithoutCommentsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateNestedOneWithoutCommentsInput>>('UserCreateNestedOneWithoutCommentsInput').implement({
  fields: UserCreateNestedOneWithoutCommentsInputFields,
});

export const PostCreateNestedOneWithoutCommentsInputFields = (t: any) => ({
  create: t.field({"required":false,"type":PostCreateWithoutCommentsInput}),
  connectOrCreate: t.field({"required":false,"type":PostCreateOrConnectWithoutCommentsInput}),
  connect: t.field({"required":false,"type":PostWhereUniqueInput}),
});
export const PostCreateNestedOneWithoutCommentsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateNestedOneWithoutCommentsInput>>('PostCreateNestedOneWithoutCommentsInput').implement({
  fields: PostCreateNestedOneWithoutCommentsInputFields,
});

export const UserUpdateOneRequiredWithoutCommentsNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":UserCreateWithoutCommentsInput}),
  connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutCommentsInput}),
  upsert: t.field({"required":false,"type":UserUpsertWithoutCommentsInput}),
  connect: t.field({"required":false,"type":UserWhereUniqueInput}),
  update: t.field({"required":false,"type":UserUpdateWithoutCommentsInput}),
});
export const UserUpdateOneRequiredWithoutCommentsNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateOneRequiredWithoutCommentsNestedInput>>('UserUpdateOneRequiredWithoutCommentsNestedInput').implement({
  fields: UserUpdateOneRequiredWithoutCommentsNestedInputFields,
});

export const PostUpdateOneRequiredWithoutCommentsNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":PostCreateWithoutCommentsInput}),
  connectOrCreate: t.field({"required":false,"type":PostCreateOrConnectWithoutCommentsInput}),
  upsert: t.field({"required":false,"type":PostUpsertWithoutCommentsInput}),
  connect: t.field({"required":false,"type":PostWhereUniqueInput}),
  update: t.field({"required":false,"type":PostUpdateWithoutCommentsInput}),
});
export const PostUpdateOneRequiredWithoutCommentsNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateOneRequiredWithoutCommentsNestedInput>>('PostUpdateOneRequiredWithoutCommentsNestedInput').implement({
  fields: PostUpdateOneRequiredWithoutCommentsNestedInputFields,
});

export const UserCreateNestedOneWithoutProfileInputFields = (t: any) => ({
  create: t.field({"required":false,"type":UserCreateWithoutProfileInput}),
  connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutProfileInput}),
  connect: t.field({"required":false,"type":UserWhereUniqueInput}),
});
export const UserCreateNestedOneWithoutProfileInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateNestedOneWithoutProfileInput>>('UserCreateNestedOneWithoutProfileInput').implement({
  fields: UserCreateNestedOneWithoutProfileInputFields,
});

export const NullableStringFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.string({"required":false}),
});
export const NullableStringFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NullableStringFieldUpdateOperationsInput>>('NullableStringFieldUpdateOperationsInput').implement({
  fields: NullableStringFieldUpdateOperationsInputFields,
});

export const UserUpdateOneRequiredWithoutProfileNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":UserCreateWithoutProfileInput}),
  connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutProfileInput}),
  upsert: t.field({"required":false,"type":UserUpsertWithoutProfileInput}),
  connect: t.field({"required":false,"type":UserWhereUniqueInput}),
  update: t.field({"required":false,"type":UserUpdateWithoutProfileInput}),
});
export const UserUpdateOneRequiredWithoutProfileNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateOneRequiredWithoutProfileNestedInput>>('UserUpdateOneRequiredWithoutProfileNestedInput').implement({
  fields: UserUpdateOneRequiredWithoutProfileNestedInputFields,
});

export const UserCreateNestedOneWithoutFollowingInputFields = (t: any) => ({
  create: t.field({"required":false,"type":UserCreateWithoutFollowingInput}),
  connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutFollowingInput}),
  connect: t.field({"required":false,"type":UserWhereUniqueInput}),
});
export const UserCreateNestedOneWithoutFollowingInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateNestedOneWithoutFollowingInput>>('UserCreateNestedOneWithoutFollowingInput').implement({
  fields: UserCreateNestedOneWithoutFollowingInputFields,
});

export const UserCreateNestedOneWithoutFollowersInputFields = (t: any) => ({
  create: t.field({"required":false,"type":UserCreateWithoutFollowersInput}),
  connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutFollowersInput}),
  connect: t.field({"required":false,"type":UserWhereUniqueInput}),
});
export const UserCreateNestedOneWithoutFollowersInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateNestedOneWithoutFollowersInput>>('UserCreateNestedOneWithoutFollowersInput').implement({
  fields: UserCreateNestedOneWithoutFollowersInputFields,
});

export const UserUpdateOneRequiredWithoutFollowingNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":UserCreateWithoutFollowingInput}),
  connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutFollowingInput}),
  upsert: t.field({"required":false,"type":UserUpsertWithoutFollowingInput}),
  connect: t.field({"required":false,"type":UserWhereUniqueInput}),
  update: t.field({"required":false,"type":UserUpdateWithoutFollowingInput}),
});
export const UserUpdateOneRequiredWithoutFollowingNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateOneRequiredWithoutFollowingNestedInput>>('UserUpdateOneRequiredWithoutFollowingNestedInput').implement({
  fields: UserUpdateOneRequiredWithoutFollowingNestedInputFields,
});

export const UserUpdateOneRequiredWithoutFollowersNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":UserCreateWithoutFollowersInput}),
  connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutFollowersInput}),
  upsert: t.field({"required":false,"type":UserUpsertWithoutFollowersInput}),
  connect: t.field({"required":false,"type":UserWhereUniqueInput}),
  update: t.field({"required":false,"type":UserUpdateWithoutFollowersInput}),
});
export const UserUpdateOneRequiredWithoutFollowersNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateOneRequiredWithoutFollowersNestedInput>>('UserUpdateOneRequiredWithoutFollowersNestedInput').implement({
  fields: UserUpdateOneRequiredWithoutFollowersNestedInputFields,
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

export const PostCreateWithoutAuthorInputFields = (t: any) => ({
  title: t.string({"required":true}),
  content: t.string({"required":true}),
  Comments: t.field({"required":false,"type":CommentCreateNestedManyWithoutPostInput}),
});
export const PostCreateWithoutAuthorInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateWithoutAuthorInput>>('PostCreateWithoutAuthorInput').implement({
  fields: PostCreateWithoutAuthorInputFields,
});

export const PostCreateOrConnectWithoutAuthorInputFields = (t: any) => ({
  where: t.field({"required":true,"type":PostWhereUniqueInput}),
  create: t.field({"required":true,"type":PostCreateWithoutAuthorInput}),
});
export const PostCreateOrConnectWithoutAuthorInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateOrConnectWithoutAuthorInput>>('PostCreateOrConnectWithoutAuthorInput').implement({
  fields: PostCreateOrConnectWithoutAuthorInputFields,
});

export const CommentCreateWithoutAuthorInputFields = (t: any) => ({
  comment: t.string({"required":true}),
  Post: t.field({"required":true,"type":PostCreateNestedOneWithoutCommentsInput}),
});
export const CommentCreateWithoutAuthorInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentCreateWithoutAuthorInput>>('CommentCreateWithoutAuthorInput').implement({
  fields: CommentCreateWithoutAuthorInputFields,
});

export const CommentCreateOrConnectWithoutAuthorInputFields = (t: any) => ({
  where: t.field({"required":true,"type":CommentWhereUniqueInput}),
  create: t.field({"required":true,"type":CommentCreateWithoutAuthorInput}),
});
export const CommentCreateOrConnectWithoutAuthorInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentCreateOrConnectWithoutAuthorInput>>('CommentCreateOrConnectWithoutAuthorInput').implement({
  fields: CommentCreateOrConnectWithoutAuthorInputFields,
});

export const ProfileCreateWithoutUserInputFields = (t: any) => ({
  bio: t.string({"required":false}),
});
export const ProfileCreateWithoutUserInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileCreateWithoutUserInput>>('ProfileCreateWithoutUserInput').implement({
  fields: ProfileCreateWithoutUserInputFields,
});

export const ProfileCreateOrConnectWithoutUserInputFields = (t: any) => ({
  where: t.field({"required":true,"type":ProfileWhereUniqueInput}),
  create: t.field({"required":true,"type":ProfileCreateWithoutUserInput}),
});
export const ProfileCreateOrConnectWithoutUserInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileCreateOrConnectWithoutUserInput>>('ProfileCreateOrConnectWithoutUserInput').implement({
  fields: ProfileCreateOrConnectWithoutUserInputFields,
});

export const FollowCreateWithoutToInputFields = (t: any) => ({
  From: t.field({"required":true,"type":UserCreateNestedOneWithoutFollowingInput}),
});
export const FollowCreateWithoutToInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowCreateWithoutToInput>>('FollowCreateWithoutToInput').implement({
  fields: FollowCreateWithoutToInputFields,
});

export const FollowCreateOrConnectWithoutToInputFields = (t: any) => ({
  where: t.field({"required":true,"type":FollowWhereUniqueInput}),
  create: t.field({"required":true,"type":FollowCreateWithoutToInput}),
});
export const FollowCreateOrConnectWithoutToInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowCreateOrConnectWithoutToInput>>('FollowCreateOrConnectWithoutToInput').implement({
  fields: FollowCreateOrConnectWithoutToInputFields,
});

export const FollowCreateWithoutFromInputFields = (t: any) => ({
  To: t.field({"required":true,"type":UserCreateNestedOneWithoutFollowersInput}),
});
export const FollowCreateWithoutFromInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowCreateWithoutFromInput>>('FollowCreateWithoutFromInput').implement({
  fields: FollowCreateWithoutFromInputFields,
});

export const FollowCreateOrConnectWithoutFromInputFields = (t: any) => ({
  where: t.field({"required":true,"type":FollowWhereUniqueInput}),
  create: t.field({"required":true,"type":FollowCreateWithoutFromInput}),
});
export const FollowCreateOrConnectWithoutFromInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowCreateOrConnectWithoutFromInput>>('FollowCreateOrConnectWithoutFromInput').implement({
  fields: FollowCreateOrConnectWithoutFromInputFields,
});

export const PostUpsertWithWhereUniqueWithoutAuthorInputFields = (t: any) => ({
  where: t.field({"required":true,"type":PostWhereUniqueInput}),
  update: t.field({"required":true,"type":PostUpdateWithoutAuthorInput}),
  create: t.field({"required":true,"type":PostCreateWithoutAuthorInput}),
});
export const PostUpsertWithWhereUniqueWithoutAuthorInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput>>('PostUpsertWithWhereUniqueWithoutAuthorInput').implement({
  fields: PostUpsertWithWhereUniqueWithoutAuthorInputFields,
});

export const PostUpdateWithWhereUniqueWithoutAuthorInputFields = (t: any) => ({
  where: t.field({"required":true,"type":PostWhereUniqueInput}),
  data: t.field({"required":true,"type":PostUpdateWithoutAuthorInput}),
});
export const PostUpdateWithWhereUniqueWithoutAuthorInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput>>('PostUpdateWithWhereUniqueWithoutAuthorInput').implement({
  fields: PostUpdateWithWhereUniqueWithoutAuthorInputFields,
});

export const PostUpdateManyWithWhereWithoutAuthorInputFields = (t: any) => ({
  where: t.field({"required":true,"type":PostScalarWhereInput}),
  data: t.field({"required":true,"type":PostUpdateManyMutationInput}),
});
export const PostUpdateManyWithWhereWithoutAuthorInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateManyWithWhereWithoutAuthorInput>>('PostUpdateManyWithWhereWithoutAuthorInput').implement({
  fields: PostUpdateManyWithWhereWithoutAuthorInputFields,
});

export const PostScalarWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[PostScalarWhereInput]}),
  OR: t.field({"required":false,"type":[PostScalarWhereInput]}),
  NOT: t.field({"required":false,"type":[PostScalarWhereInput]}),
  id: t.field({"required":false,"type":IntFilter}),
  title: t.field({"required":false,"type":StringFilter}),
  content: t.field({"required":false,"type":StringFilter}),
  authorId: t.field({"required":false,"type":IntFilter}),
});
export const PostScalarWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostScalarWhereInput>>('PostScalarWhereInput').implement({
  fields: PostScalarWhereInputFields,
});

export const CommentUpsertWithWhereUniqueWithoutAuthorInputFields = (t: any) => ({
  where: t.field({"required":true,"type":CommentWhereUniqueInput}),
  update: t.field({"required":true,"type":CommentUpdateWithoutAuthorInput}),
  create: t.field({"required":true,"type":CommentCreateWithoutAuthorInput}),
});
export const CommentUpsertWithWhereUniqueWithoutAuthorInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentUpsertWithWhereUniqueWithoutAuthorInput>>('CommentUpsertWithWhereUniqueWithoutAuthorInput').implement({
  fields: CommentUpsertWithWhereUniqueWithoutAuthorInputFields,
});

export const CommentUpdateWithWhereUniqueWithoutAuthorInputFields = (t: any) => ({
  where: t.field({"required":true,"type":CommentWhereUniqueInput}),
  data: t.field({"required":true,"type":CommentUpdateWithoutAuthorInput}),
});
export const CommentUpdateWithWhereUniqueWithoutAuthorInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentUpdateWithWhereUniqueWithoutAuthorInput>>('CommentUpdateWithWhereUniqueWithoutAuthorInput').implement({
  fields: CommentUpdateWithWhereUniqueWithoutAuthorInputFields,
});

export const CommentUpdateManyWithWhereWithoutAuthorInputFields = (t: any) => ({
  where: t.field({"required":true,"type":CommentScalarWhereInput}),
  data: t.field({"required":true,"type":CommentUpdateManyMutationInput}),
});
export const CommentUpdateManyWithWhereWithoutAuthorInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentUpdateManyWithWhereWithoutAuthorInput>>('CommentUpdateManyWithWhereWithoutAuthorInput').implement({
  fields: CommentUpdateManyWithWhereWithoutAuthorInputFields,
});

export const CommentScalarWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[CommentScalarWhereInput]}),
  OR: t.field({"required":false,"type":[CommentScalarWhereInput]}),
  NOT: t.field({"required":false,"type":[CommentScalarWhereInput]}),
  id: t.field({"required":false,"type":IntFilter}),
  comment: t.field({"required":false,"type":StringFilter}),
  authorId: t.field({"required":false,"type":IntFilter}),
  postId: t.field({"required":false,"type":IntFilter}),
});
export const CommentScalarWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentScalarWhereInput>>('CommentScalarWhereInput').implement({
  fields: CommentScalarWhereInputFields,
});

export const ProfileUpsertWithWhereUniqueWithoutUserInputFields = (t: any) => ({
  where: t.field({"required":true,"type":ProfileWhereUniqueInput}),
  update: t.field({"required":true,"type":ProfileUpdateWithoutUserInput}),
  create: t.field({"required":true,"type":ProfileCreateWithoutUserInput}),
});
export const ProfileUpsertWithWhereUniqueWithoutUserInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileUpsertWithWhereUniqueWithoutUserInput>>('ProfileUpsertWithWhereUniqueWithoutUserInput').implement({
  fields: ProfileUpsertWithWhereUniqueWithoutUserInputFields,
});

export const ProfileUpdateWithWhereUniqueWithoutUserInputFields = (t: any) => ({
  where: t.field({"required":true,"type":ProfileWhereUniqueInput}),
  data: t.field({"required":true,"type":ProfileUpdateWithoutUserInput}),
});
export const ProfileUpdateWithWhereUniqueWithoutUserInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileUpdateWithWhereUniqueWithoutUserInput>>('ProfileUpdateWithWhereUniqueWithoutUserInput').implement({
  fields: ProfileUpdateWithWhereUniqueWithoutUserInputFields,
});

export const ProfileUpdateManyWithWhereWithoutUserInputFields = (t: any) => ({
  where: t.field({"required":true,"type":ProfileScalarWhereInput}),
  data: t.field({"required":true,"type":ProfileUpdateManyMutationInput}),
});
export const ProfileUpdateManyWithWhereWithoutUserInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileUpdateManyWithWhereWithoutUserInput>>('ProfileUpdateManyWithWhereWithoutUserInput').implement({
  fields: ProfileUpdateManyWithWhereWithoutUserInputFields,
});

export const ProfileScalarWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[ProfileScalarWhereInput]}),
  OR: t.field({"required":false,"type":[ProfileScalarWhereInput]}),
  NOT: t.field({"required":false,"type":[ProfileScalarWhereInput]}),
  id: t.field({"required":false,"type":IntFilter}),
  bio: t.field({"required":false,"type":StringNullableFilter}),
  userId: t.field({"required":false,"type":IntFilter}),
});
export const ProfileScalarWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileScalarWhereInput>>('ProfileScalarWhereInput').implement({
  fields: ProfileScalarWhereInputFields,
});

export const FollowUpsertWithWhereUniqueWithoutToInputFields = (t: any) => ({
  where: t.field({"required":true,"type":FollowWhereUniqueInput}),
  update: t.field({"required":true,"type":FollowUpdateWithoutToInput}),
  create: t.field({"required":true,"type":FollowCreateWithoutToInput}),
});
export const FollowUpsertWithWhereUniqueWithoutToInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowUpsertWithWhereUniqueWithoutToInput>>('FollowUpsertWithWhereUniqueWithoutToInput').implement({
  fields: FollowUpsertWithWhereUniqueWithoutToInputFields,
});

export const FollowUpdateWithWhereUniqueWithoutToInputFields = (t: any) => ({
  where: t.field({"required":true,"type":FollowWhereUniqueInput}),
  data: t.field({"required":true,"type":FollowUpdateWithoutToInput}),
});
export const FollowUpdateWithWhereUniqueWithoutToInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowUpdateWithWhereUniqueWithoutToInput>>('FollowUpdateWithWhereUniqueWithoutToInput').implement({
  fields: FollowUpdateWithWhereUniqueWithoutToInputFields,
});

export const FollowUpdateManyWithWhereWithoutToInputFields = (t: any) => ({
  where: t.field({"required":true,"type":FollowScalarWhereInput}),
  data: t.field({"required":true,"type":FollowUpdateManyMutationInput}),
});
export const FollowUpdateManyWithWhereWithoutToInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowUpdateManyWithWhereWithoutToInput>>('FollowUpdateManyWithWhereWithoutToInput').implement({
  fields: FollowUpdateManyWithWhereWithoutToInputFields,
});

export const FollowScalarWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[FollowScalarWhereInput]}),
  OR: t.field({"required":false,"type":[FollowScalarWhereInput]}),
  NOT: t.field({"required":false,"type":[FollowScalarWhereInput]}),
  fromId: t.field({"required":false,"type":IntFilter}),
  toId: t.field({"required":false,"type":IntFilter}),
});
export const FollowScalarWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowScalarWhereInput>>('FollowScalarWhereInput').implement({
  fields: FollowScalarWhereInputFields,
});

export const FollowUpsertWithWhereUniqueWithoutFromInputFields = (t: any) => ({
  where: t.field({"required":true,"type":FollowWhereUniqueInput}),
  update: t.field({"required":true,"type":FollowUpdateWithoutFromInput}),
  create: t.field({"required":true,"type":FollowCreateWithoutFromInput}),
});
export const FollowUpsertWithWhereUniqueWithoutFromInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowUpsertWithWhereUniqueWithoutFromInput>>('FollowUpsertWithWhereUniqueWithoutFromInput').implement({
  fields: FollowUpsertWithWhereUniqueWithoutFromInputFields,
});

export const FollowUpdateWithWhereUniqueWithoutFromInputFields = (t: any) => ({
  where: t.field({"required":true,"type":FollowWhereUniqueInput}),
  data: t.field({"required":true,"type":FollowUpdateWithoutFromInput}),
});
export const FollowUpdateWithWhereUniqueWithoutFromInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowUpdateWithWhereUniqueWithoutFromInput>>('FollowUpdateWithWhereUniqueWithoutFromInput').implement({
  fields: FollowUpdateWithWhereUniqueWithoutFromInputFields,
});

export const FollowUpdateManyWithWhereWithoutFromInputFields = (t: any) => ({
  where: t.field({"required":true,"type":FollowScalarWhereInput}),
  data: t.field({"required":true,"type":FollowUpdateManyMutationInput}),
});
export const FollowUpdateManyWithWhereWithoutFromInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowUpdateManyWithWhereWithoutFromInput>>('FollowUpdateManyWithWhereWithoutFromInput').implement({
  fields: FollowUpdateManyWithWhereWithoutFromInputFields,
});

export const UserCreateWithoutPostsInputFields = (t: any) => ({
  firstName: t.string({"required":true}),
  lastName: t.string({"required":true}),
  birthdate: t.field({"required":true,"type":DateTime}),
  login: t.string({"required":true}),
  Comments: t.field({"required":false,"type":CommentCreateNestedManyWithoutAuthorInput}),
  Profile: t.field({"required":false,"type":ProfileCreateNestedManyWithoutUserInput}),
  Followers: t.field({"required":false,"type":FollowCreateNestedManyWithoutToInput}),
  Following: t.field({"required":false,"type":FollowCreateNestedManyWithoutFromInput}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const UserCreateWithoutPostsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateWithoutPostsInput>>('UserCreateWithoutPostsInput').implement({
  fields: UserCreateWithoutPostsInputFields,
});

export const UserCreateOrConnectWithoutPostsInputFields = (t: any) => ({
  where: t.field({"required":true,"type":UserWhereUniqueInput}),
  create: t.field({"required":true,"type":UserCreateWithoutPostsInput}),
});
export const UserCreateOrConnectWithoutPostsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateOrConnectWithoutPostsInput>>('UserCreateOrConnectWithoutPostsInput').implement({
  fields: UserCreateOrConnectWithoutPostsInputFields,
});

export const CommentCreateWithoutPostInputFields = (t: any) => ({
  comment: t.string({"required":true}),
  Author: t.field({"required":true,"type":UserCreateNestedOneWithoutCommentsInput}),
});
export const CommentCreateWithoutPostInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentCreateWithoutPostInput>>('CommentCreateWithoutPostInput').implement({
  fields: CommentCreateWithoutPostInputFields,
});

export const CommentCreateOrConnectWithoutPostInputFields = (t: any) => ({
  where: t.field({"required":true,"type":CommentWhereUniqueInput}),
  create: t.field({"required":true,"type":CommentCreateWithoutPostInput}),
});
export const CommentCreateOrConnectWithoutPostInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentCreateOrConnectWithoutPostInput>>('CommentCreateOrConnectWithoutPostInput').implement({
  fields: CommentCreateOrConnectWithoutPostInputFields,
});

export const UserUpsertWithoutPostsInputFields = (t: any) => ({
  update: t.field({"required":true,"type":UserUpdateWithoutPostsInput}),
  create: t.field({"required":true,"type":UserCreateWithoutPostsInput}),
});
export const UserUpsertWithoutPostsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpsertWithoutPostsInput>>('UserUpsertWithoutPostsInput').implement({
  fields: UserUpsertWithoutPostsInputFields,
});

export const UserUpdateWithoutPostsInputFields = (t: any) => ({
  firstName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  lastName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  birthdate: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  login: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  Comments: t.field({"required":false,"type":CommentUpdateManyWithoutAuthorNestedInput}),
  Profile: t.field({"required":false,"type":ProfileUpdateManyWithoutUserNestedInput}),
  Followers: t.field({"required":false,"type":FollowUpdateManyWithoutToNestedInput}),
  Following: t.field({"required":false,"type":FollowUpdateManyWithoutFromNestedInput}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const UserUpdateWithoutPostsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateWithoutPostsInput>>('UserUpdateWithoutPostsInput').implement({
  fields: UserUpdateWithoutPostsInputFields,
});

export const CommentUpsertWithWhereUniqueWithoutPostInputFields = (t: any) => ({
  where: t.field({"required":true,"type":CommentWhereUniqueInput}),
  update: t.field({"required":true,"type":CommentUpdateWithoutPostInput}),
  create: t.field({"required":true,"type":CommentCreateWithoutPostInput}),
});
export const CommentUpsertWithWhereUniqueWithoutPostInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentUpsertWithWhereUniqueWithoutPostInput>>('CommentUpsertWithWhereUniqueWithoutPostInput').implement({
  fields: CommentUpsertWithWhereUniqueWithoutPostInputFields,
});

export const CommentUpdateWithWhereUniqueWithoutPostInputFields = (t: any) => ({
  where: t.field({"required":true,"type":CommentWhereUniqueInput}),
  data: t.field({"required":true,"type":CommentUpdateWithoutPostInput}),
});
export const CommentUpdateWithWhereUniqueWithoutPostInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentUpdateWithWhereUniqueWithoutPostInput>>('CommentUpdateWithWhereUniqueWithoutPostInput').implement({
  fields: CommentUpdateWithWhereUniqueWithoutPostInputFields,
});

export const CommentUpdateManyWithWhereWithoutPostInputFields = (t: any) => ({
  where: t.field({"required":true,"type":CommentScalarWhereInput}),
  data: t.field({"required":true,"type":CommentUpdateManyMutationInput}),
});
export const CommentUpdateManyWithWhereWithoutPostInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentUpdateManyWithWhereWithoutPostInput>>('CommentUpdateManyWithWhereWithoutPostInput').implement({
  fields: CommentUpdateManyWithWhereWithoutPostInputFields,
});

export const UserCreateWithoutCommentsInputFields = (t: any) => ({
  firstName: t.string({"required":true}),
  lastName: t.string({"required":true}),
  birthdate: t.field({"required":true,"type":DateTime}),
  login: t.string({"required":true}),
  Posts: t.field({"required":false,"type":PostCreateNestedManyWithoutAuthorInput}),
  Profile: t.field({"required":false,"type":ProfileCreateNestedManyWithoutUserInput}),
  Followers: t.field({"required":false,"type":FollowCreateNestedManyWithoutToInput}),
  Following: t.field({"required":false,"type":FollowCreateNestedManyWithoutFromInput}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const UserCreateWithoutCommentsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateWithoutCommentsInput>>('UserCreateWithoutCommentsInput').implement({
  fields: UserCreateWithoutCommentsInputFields,
});

export const UserCreateOrConnectWithoutCommentsInputFields = (t: any) => ({
  where: t.field({"required":true,"type":UserWhereUniqueInput}),
  create: t.field({"required":true,"type":UserCreateWithoutCommentsInput}),
});
export const UserCreateOrConnectWithoutCommentsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateOrConnectWithoutCommentsInput>>('UserCreateOrConnectWithoutCommentsInput').implement({
  fields: UserCreateOrConnectWithoutCommentsInputFields,
});

export const PostCreateWithoutCommentsInputFields = (t: any) => ({
  title: t.string({"required":true}),
  content: t.string({"required":true}),
  Author: t.field({"required":true,"type":UserCreateNestedOneWithoutPostsInput}),
});
export const PostCreateWithoutCommentsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateWithoutCommentsInput>>('PostCreateWithoutCommentsInput').implement({
  fields: PostCreateWithoutCommentsInputFields,
});

export const PostCreateOrConnectWithoutCommentsInputFields = (t: any) => ({
  where: t.field({"required":true,"type":PostWhereUniqueInput}),
  create: t.field({"required":true,"type":PostCreateWithoutCommentsInput}),
});
export const PostCreateOrConnectWithoutCommentsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateOrConnectWithoutCommentsInput>>('PostCreateOrConnectWithoutCommentsInput').implement({
  fields: PostCreateOrConnectWithoutCommentsInputFields,
});

export const UserUpsertWithoutCommentsInputFields = (t: any) => ({
  update: t.field({"required":true,"type":UserUpdateWithoutCommentsInput}),
  create: t.field({"required":true,"type":UserCreateWithoutCommentsInput}),
});
export const UserUpsertWithoutCommentsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpsertWithoutCommentsInput>>('UserUpsertWithoutCommentsInput').implement({
  fields: UserUpsertWithoutCommentsInputFields,
});

export const UserUpdateWithoutCommentsInputFields = (t: any) => ({
  firstName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  lastName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  birthdate: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  login: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  Posts: t.field({"required":false,"type":PostUpdateManyWithoutAuthorNestedInput}),
  Profile: t.field({"required":false,"type":ProfileUpdateManyWithoutUserNestedInput}),
  Followers: t.field({"required":false,"type":FollowUpdateManyWithoutToNestedInput}),
  Following: t.field({"required":false,"type":FollowUpdateManyWithoutFromNestedInput}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const UserUpdateWithoutCommentsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateWithoutCommentsInput>>('UserUpdateWithoutCommentsInput').implement({
  fields: UserUpdateWithoutCommentsInputFields,
});

export const PostUpsertWithoutCommentsInputFields = (t: any) => ({
  update: t.field({"required":true,"type":PostUpdateWithoutCommentsInput}),
  create: t.field({"required":true,"type":PostCreateWithoutCommentsInput}),
});
export const PostUpsertWithoutCommentsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpsertWithoutCommentsInput>>('PostUpsertWithoutCommentsInput').implement({
  fields: PostUpsertWithoutCommentsInputFields,
});

export const PostUpdateWithoutCommentsInputFields = (t: any) => ({
  title: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  content: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  Author: t.field({"required":false,"type":UserUpdateOneRequiredWithoutPostsNestedInput}),
});
export const PostUpdateWithoutCommentsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateWithoutCommentsInput>>('PostUpdateWithoutCommentsInput').implement({
  fields: PostUpdateWithoutCommentsInputFields,
});

export const UserCreateWithoutProfileInputFields = (t: any) => ({
  firstName: t.string({"required":true}),
  lastName: t.string({"required":true}),
  birthdate: t.field({"required":true,"type":DateTime}),
  login: t.string({"required":true}),
  Posts: t.field({"required":false,"type":PostCreateNestedManyWithoutAuthorInput}),
  Comments: t.field({"required":false,"type":CommentCreateNestedManyWithoutAuthorInput}),
  Followers: t.field({"required":false,"type":FollowCreateNestedManyWithoutToInput}),
  Following: t.field({"required":false,"type":FollowCreateNestedManyWithoutFromInput}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const UserCreateWithoutProfileInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateWithoutProfileInput>>('UserCreateWithoutProfileInput').implement({
  fields: UserCreateWithoutProfileInputFields,
});

export const UserCreateOrConnectWithoutProfileInputFields = (t: any) => ({
  where: t.field({"required":true,"type":UserWhereUniqueInput}),
  create: t.field({"required":true,"type":UserCreateWithoutProfileInput}),
});
export const UserCreateOrConnectWithoutProfileInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateOrConnectWithoutProfileInput>>('UserCreateOrConnectWithoutProfileInput').implement({
  fields: UserCreateOrConnectWithoutProfileInputFields,
});

export const UserUpsertWithoutProfileInputFields = (t: any) => ({
  update: t.field({"required":true,"type":UserUpdateWithoutProfileInput}),
  create: t.field({"required":true,"type":UserCreateWithoutProfileInput}),
});
export const UserUpsertWithoutProfileInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpsertWithoutProfileInput>>('UserUpsertWithoutProfileInput').implement({
  fields: UserUpsertWithoutProfileInputFields,
});

export const UserUpdateWithoutProfileInputFields = (t: any) => ({
  firstName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  lastName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  birthdate: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  login: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  Posts: t.field({"required":false,"type":PostUpdateManyWithoutAuthorNestedInput}),
  Comments: t.field({"required":false,"type":CommentUpdateManyWithoutAuthorNestedInput}),
  Followers: t.field({"required":false,"type":FollowUpdateManyWithoutToNestedInput}),
  Following: t.field({"required":false,"type":FollowUpdateManyWithoutFromNestedInput}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const UserUpdateWithoutProfileInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateWithoutProfileInput>>('UserUpdateWithoutProfileInput').implement({
  fields: UserUpdateWithoutProfileInputFields,
});

export const UserCreateWithoutFollowingInputFields = (t: any) => ({
  firstName: t.string({"required":true}),
  lastName: t.string({"required":true}),
  birthdate: t.field({"required":true,"type":DateTime}),
  login: t.string({"required":true}),
  Posts: t.field({"required":false,"type":PostCreateNestedManyWithoutAuthorInput}),
  Comments: t.field({"required":false,"type":CommentCreateNestedManyWithoutAuthorInput}),
  Profile: t.field({"required":false,"type":ProfileCreateNestedManyWithoutUserInput}),
  Followers: t.field({"required":false,"type":FollowCreateNestedManyWithoutToInput}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const UserCreateWithoutFollowingInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateWithoutFollowingInput>>('UserCreateWithoutFollowingInput').implement({
  fields: UserCreateWithoutFollowingInputFields,
});

export const UserCreateOrConnectWithoutFollowingInputFields = (t: any) => ({
  where: t.field({"required":true,"type":UserWhereUniqueInput}),
  create: t.field({"required":true,"type":UserCreateWithoutFollowingInput}),
});
export const UserCreateOrConnectWithoutFollowingInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateOrConnectWithoutFollowingInput>>('UserCreateOrConnectWithoutFollowingInput').implement({
  fields: UserCreateOrConnectWithoutFollowingInputFields,
});

export const UserCreateWithoutFollowersInputFields = (t: any) => ({
  firstName: t.string({"required":true}),
  lastName: t.string({"required":true}),
  birthdate: t.field({"required":true,"type":DateTime}),
  login: t.string({"required":true}),
  Posts: t.field({"required":false,"type":PostCreateNestedManyWithoutAuthorInput}),
  Comments: t.field({"required":false,"type":CommentCreateNestedManyWithoutAuthorInput}),
  Profile: t.field({"required":false,"type":ProfileCreateNestedManyWithoutUserInput}),
  Following: t.field({"required":false,"type":FollowCreateNestedManyWithoutFromInput}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const UserCreateWithoutFollowersInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateWithoutFollowersInput>>('UserCreateWithoutFollowersInput').implement({
  fields: UserCreateWithoutFollowersInputFields,
});

export const UserCreateOrConnectWithoutFollowersInputFields = (t: any) => ({
  where: t.field({"required":true,"type":UserWhereUniqueInput}),
  create: t.field({"required":true,"type":UserCreateWithoutFollowersInput}),
});
export const UserCreateOrConnectWithoutFollowersInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateOrConnectWithoutFollowersInput>>('UserCreateOrConnectWithoutFollowersInput').implement({
  fields: UserCreateOrConnectWithoutFollowersInputFields,
});

export const UserUpsertWithoutFollowingInputFields = (t: any) => ({
  update: t.field({"required":true,"type":UserUpdateWithoutFollowingInput}),
  create: t.field({"required":true,"type":UserCreateWithoutFollowingInput}),
});
export const UserUpsertWithoutFollowingInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpsertWithoutFollowingInput>>('UserUpsertWithoutFollowingInput').implement({
  fields: UserUpsertWithoutFollowingInputFields,
});

export const UserUpdateWithoutFollowingInputFields = (t: any) => ({
  firstName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  lastName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  birthdate: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  login: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  Posts: t.field({"required":false,"type":PostUpdateManyWithoutAuthorNestedInput}),
  Comments: t.field({"required":false,"type":CommentUpdateManyWithoutAuthorNestedInput}),
  Profile: t.field({"required":false,"type":ProfileUpdateManyWithoutUserNestedInput}),
  Followers: t.field({"required":false,"type":FollowUpdateManyWithoutToNestedInput}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const UserUpdateWithoutFollowingInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateWithoutFollowingInput>>('UserUpdateWithoutFollowingInput').implement({
  fields: UserUpdateWithoutFollowingInputFields,
});

export const UserUpsertWithoutFollowersInputFields = (t: any) => ({
  update: t.field({"required":true,"type":UserUpdateWithoutFollowersInput}),
  create: t.field({"required":true,"type":UserCreateWithoutFollowersInput}),
});
export const UserUpsertWithoutFollowersInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpsertWithoutFollowersInput>>('UserUpsertWithoutFollowersInput').implement({
  fields: UserUpsertWithoutFollowersInputFields,
});

export const UserUpdateWithoutFollowersInputFields = (t: any) => ({
  firstName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  lastName: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  birthdate: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  login: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  Posts: t.field({"required":false,"type":PostUpdateManyWithoutAuthorNestedInput}),
  Comments: t.field({"required":false,"type":CommentUpdateManyWithoutAuthorNestedInput}),
  Profile: t.field({"required":false,"type":ProfileUpdateManyWithoutUserNestedInput}),
  Following: t.field({"required":false,"type":FollowUpdateManyWithoutFromNestedInput}),
  // 'password' was omitted due to @Pothos.omit found in schema comment
  // 'createdAt' was omitted due to @Pothos.omit found in schema comment
  // 'updatedAt' was omitted due to @Pothos.omit found in schema comment
});
export const UserUpdateWithoutFollowersInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateWithoutFollowersInput>>('UserUpdateWithoutFollowersInput').implement({
  fields: UserUpdateWithoutFollowersInputFields,
});

export const PostUpdateWithoutAuthorInputFields = (t: any) => ({
  title: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  content: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  Comments: t.field({"required":false,"type":CommentUpdateManyWithoutPostNestedInput}),
});
export const PostUpdateWithoutAuthorInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateWithoutAuthorInput>>('PostUpdateWithoutAuthorInput').implement({
  fields: PostUpdateWithoutAuthorInputFields,
});

export const CommentUpdateWithoutAuthorInputFields = (t: any) => ({
  comment: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  Post: t.field({"required":false,"type":PostUpdateOneRequiredWithoutCommentsNestedInput}),
});
export const CommentUpdateWithoutAuthorInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentUpdateWithoutAuthorInput>>('CommentUpdateWithoutAuthorInput').implement({
  fields: CommentUpdateWithoutAuthorInputFields,
});

export const ProfileUpdateWithoutUserInputFields = (t: any) => ({
  bio: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
});
export const ProfileUpdateWithoutUserInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ProfileUpdateWithoutUserInput>>('ProfileUpdateWithoutUserInput').implement({
  fields: ProfileUpdateWithoutUserInputFields,
});

export const FollowUpdateWithoutToInputFields = (t: any) => ({
  From: t.field({"required":false,"type":UserUpdateOneRequiredWithoutFollowingNestedInput}),
});
export const FollowUpdateWithoutToInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowUpdateWithoutToInput>>('FollowUpdateWithoutToInput').implement({
  fields: FollowUpdateWithoutToInputFields,
});

export const FollowUpdateWithoutFromInputFields = (t: any) => ({
  To: t.field({"required":false,"type":UserUpdateOneRequiredWithoutFollowersNestedInput}),
});
export const FollowUpdateWithoutFromInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FollowUpdateWithoutFromInput>>('FollowUpdateWithoutFromInput').implement({
  fields: FollowUpdateWithoutFromInputFields,
});

export const CommentUpdateWithoutPostInputFields = (t: any) => ({
  comment: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  Author: t.field({"required":false,"type":UserUpdateOneRequiredWithoutCommentsNestedInput}),
});
export const CommentUpdateWithoutPostInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.CommentUpdateWithoutPostInput>>('CommentUpdateWithoutPostInput').implement({
  fields: CommentUpdateWithoutPostInputFields,
});