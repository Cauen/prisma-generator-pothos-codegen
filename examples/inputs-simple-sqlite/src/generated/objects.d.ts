/* eslint-disable */
import type { Prisma, User, UserLast, Post, ExtraModal, Comment, Profile, Follow, Unrelated, IdOnly, WithoutID, WithScalars } from ".prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: Prisma.UserCreateInput;
        Update: Prisma.UserUpdateInput;
        RelationName: "Posts" | "Comments" | "Profile" | "Followers" | "Following";
        ListRelations: "Posts" | "Comments" | "Profile" | "Followers" | "Following";
        Relations: {
            Posts: {
                Shape: Post[];
                Name: "Post";
            };
            Comments: {
                Shape: Comment[];
                Name: "Comment";
            };
            Profile: {
                Shape: Profile[];
                Name: "Profile";
            };
            Followers: {
                Shape: Follow[];
                Name: "Follow";
            };
            Following: {
                Shape: Follow[];
                Name: "Follow";
            };
        };
    };
    UserLast: {
        Name: "UserLast";
        Shape: UserLast;
        Include: never;
        Select: Prisma.UserLastSelect;
        OrderBy: Prisma.UserLastOrderByWithRelationInput;
        WhereUnique: Prisma.UserLastWhereUniqueInput;
        Where: Prisma.UserLastWhereInput;
        Create: Prisma.UserLastCreateInput;
        Update: Prisma.UserLastUpdateInput;
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    Post: {
        Name: "Post";
        Shape: Post;
        Include: Prisma.PostInclude;
        Select: Prisma.PostSelect;
        OrderBy: Prisma.PostOrderByWithRelationInput;
        WhereUnique: Prisma.PostWhereUniqueInput;
        Where: Prisma.PostWhereInput;
        Create: Prisma.PostCreateInput;
        Update: Prisma.PostUpdateInput;
        RelationName: "Author" | "Comments";
        ListRelations: "Comments";
        Relations: {
            Author: {
                Shape: User;
                Name: "User";
            };
            Comments: {
                Shape: Comment[];
                Name: "Comment";
            };
        };
    };
    ExtraModal: {
        Name: "ExtraModal";
        Shape: ExtraModal;
        Include: never;
        Select: Prisma.ExtraModalSelect;
        OrderBy: Prisma.ExtraModalOrderByWithRelationInput;
        WhereUnique: Prisma.ExtraModalWhereUniqueInput;
        Where: Prisma.ExtraModalWhereInput;
        Create: Prisma.ExtraModalCreateInput;
        Update: Prisma.ExtraModalUpdateInput;
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    Comment: {
        Name: "Comment";
        Shape: Comment;
        Include: Prisma.CommentInclude;
        Select: Prisma.CommentSelect;
        OrderBy: Prisma.CommentOrderByWithRelationInput;
        WhereUnique: Prisma.CommentWhereUniqueInput;
        Where: Prisma.CommentWhereInput;
        Create: Prisma.CommentCreateInput;
        Update: Prisma.CommentUpdateInput;
        RelationName: "Author" | "Post";
        ListRelations: never;
        Relations: {
            Author: {
                Shape: User;
                Name: "User";
            };
            Post: {
                Shape: Post;
                Name: "Post";
            };
        };
    };
    Profile: {
        Name: "Profile";
        Shape: Profile;
        Include: Prisma.ProfileInclude;
        Select: Prisma.ProfileSelect;
        OrderBy: Prisma.ProfileOrderByWithRelationInput;
        WhereUnique: Prisma.ProfileWhereUniqueInput;
        Where: Prisma.ProfileWhereInput;
        Create: Prisma.ProfileCreateInput;
        Update: Prisma.ProfileUpdateInput;
        RelationName: "User";
        ListRelations: never;
        Relations: {
            User: {
                Shape: User;
                Name: "User";
            };
        };
    };
    Follow: {
        Name: "Follow";
        Shape: Follow;
        Include: Prisma.FollowInclude;
        Select: Prisma.FollowSelect;
        OrderBy: Prisma.FollowOrderByWithRelationInput;
        WhereUnique: Prisma.FollowWhereUniqueInput;
        Where: Prisma.FollowWhereInput;
        Create: Prisma.FollowCreateInput;
        Update: Prisma.FollowUpdateInput;
        RelationName: "From" | "To";
        ListRelations: never;
        Relations: {
            From: {
                Shape: User;
                Name: "User";
            };
            To: {
                Shape: User;
                Name: "User";
            };
        };
    };
    Unrelated: {
        Name: "Unrelated";
        Shape: Unrelated;
        Include: never;
        Select: Prisma.UnrelatedSelect;
        OrderBy: Prisma.UnrelatedOrderByWithRelationInput;
        WhereUnique: Prisma.UnrelatedWhereUniqueInput;
        Where: Prisma.UnrelatedWhereInput;
        Create: Prisma.UnrelatedCreateInput;
        Update: Prisma.UnrelatedUpdateInput;
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    IdOnly: {
        Name: "IdOnly";
        Shape: IdOnly;
        Include: never;
        Select: Prisma.IdOnlySelect;
        OrderBy: Prisma.IdOnlyOrderByWithRelationInput;
        WhereUnique: Prisma.IdOnlyWhereUniqueInput;
        Where: Prisma.IdOnlyWhereInput;
        Create: Prisma.IdOnlyCreateInput;
        Update: Prisma.IdOnlyUpdateInput;
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    WithoutID: {
        Name: "WithoutID";
        Shape: WithoutID;
        Include: never;
        Select: Prisma.WithoutIDSelect;
        OrderBy: Prisma.WithoutIDOrderByWithRelationInput;
        WhereUnique: Prisma.WithoutIDWhereUniqueInput;
        Where: Prisma.WithoutIDWhereInput;
        Create: Prisma.WithoutIDCreateInput;
        Update: Prisma.WithoutIDUpdateInput;
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    WithScalars: {
        Name: "WithScalars";
        Shape: WithScalars;
        Include: never;
        Select: Prisma.WithScalarsSelect;
        OrderBy: Prisma.WithScalarsOrderByWithRelationInput;
        WhereUnique: Prisma.WithScalarsWhereUniqueInput;
        Where: Prisma.WithScalarsWhereInput;
        Create: Prisma.WithScalarsCreateInput;
        Update: Prisma.WithScalarsUpdateInput;
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
}