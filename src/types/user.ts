import { SocialSigninType } from './signin';

type User = {
  user: {
    lastLoginDate: string; // Date
    marketingAgreed: number; // 0 or 1
    registerType: SocialSigninType;
    registeredDate: string; // Date
    userEmail: string;
    userName: string | null;
  };
};

type PutUserParams = {
  userName: string;
  marketingAgreed: boolean;
  statusMessage?: string;
  profileImage: boolean;
};

type PutUserRes = User & {
  profileImageUrl: string | null;
};

type DeleteUserRes = {
  userEmail: string;
};

export { type User, type PutUserParams, type PutUserRes, type DeleteUserRes };
