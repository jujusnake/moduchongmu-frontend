const SOCIAL_SIGNIN = ['naver', 'kakao', 'google', 'apple'] as const;
type SocialSigninType = (typeof SOCIAL_SIGNIN)[number];

type PostSigninParams = {
  type: SocialSigninType;
  code: string;
};

type PostSigninNativeTokenParams = {
  type: SocialSigninType;
  token: string;
};

type PostSigninRes = {
  processType: 'signin' | 'signup' | 'signup-ing';
  accessToken: string;
  refreshToken: string;
};

export {
  SOCIAL_SIGNIN,
  type SocialSigninType,
  type PostSigninParams,
  type PostSigninRes,
  type PostSigninNativeTokenParams,
};
