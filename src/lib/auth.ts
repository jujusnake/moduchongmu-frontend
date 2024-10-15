import { LOCALSTORAGE_KEYS } from '@/constants/storage';
import { SocialSigninType } from '@/types/signin';

const setToken = (token: { oauthType: SocialSigninType; accessToken: string; refreshToken: string }) => {
  localStorage.setItem(LOCALSTORAGE_KEYS.oauthType, token.oauthType);
  localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, token.accessToken);
  localStorage.setItem(LOCALSTORAGE_KEYS.refreshToken, token.refreshToken);
};

const removeToken = () => {
  localStorage.removeItem(LOCALSTORAGE_KEYS.oauthType);
  localStorage.removeItem(LOCALSTORAGE_KEYS.accessToken);
  localStorage.removeItem(LOCALSTORAGE_KEYS.refreshToken);
};

export { setToken, removeToken };
