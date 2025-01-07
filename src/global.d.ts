import { SocialSigninType } from './types/signin';

declare global {
  interface Window {
    // Kotlin에서 호출하는 JS 함수
    kotlin?: {
      handleKotlinToken: (type: SocialSigninType, accessToken: string, refreshToken: string) => void;
    };
    // JS에서 호출하는 Kotlin 함수
    AndroidWV?: {
      oAuthSignin: (type: SocialSigninType) => void;
      sendMessage: (message: string) => void;
    };
  }
}
