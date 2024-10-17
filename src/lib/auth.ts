import { LOCALSTORAGE_KEYS } from '@/constants/storage';
import { SocialSigninType } from '@/types/signin';

const getTokens = () => {
  const accessToken = localStorage.getItem(LOCALSTORAGE_KEYS.accessToken);
  const refreshToken = localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken);
  const oauthType = localStorage.getItem(LOCALSTORAGE_KEYS.oauthType);

  return {
    accessToken,
    refreshToken,
    oauthType,
  };
};

const setTokens = (token: { oauthType?: SocialSigninType; accessToken?: string; refreshToken?: string }) => {
  token.oauthType && localStorage.setItem(LOCALSTORAGE_KEYS.oauthType, token.oauthType);
  token.accessToken && localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, token.accessToken);
  token.refreshToken && localStorage.setItem(LOCALSTORAGE_KEYS.refreshToken, token.refreshToken);
};

const removeTokens = () => {
  localStorage.removeItem(LOCALSTORAGE_KEYS.oauthType);
  localStorage.removeItem(LOCALSTORAGE_KEYS.accessToken);
  localStorage.removeItem(LOCALSTORAGE_KEYS.refreshToken);
};

export { getTokens, setTokens, removeTokens };
