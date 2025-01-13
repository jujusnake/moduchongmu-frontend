import { LOCALSTORAGE_KEYS } from '@/constants/storage';

const updateUserThumbnailQuery = () => {
  localStorage.setItem(LOCALSTORAGE_KEYS.userThumbnailVersion, `${new Date().getTime()}`);
};

const updateTravelThumbnailQuery = () => {
  localStorage.setItem(LOCALSTORAGE_KEYS.travelThumbnailVersion, `${new Date().getTime()}`);
};

const getUserThumbnail = (userEmail?: string) => {
  if (!userEmail) return;
  const v = localStorage.getItem(LOCALSTORAGE_KEYS.userThumbnailVersion);
  return `https://moduchongmu-dev-bucket.s3.ap-northeast-2.amazonaws.com/user/${userEmail}/profile.png?${v ?? ''}`;
};

const getTravelThumbnail = (travelId?: string) => {
  if (!travelId) return;
  const v = localStorage.getItem(LOCALSTORAGE_KEYS.travelThumbnailVersion);
  return `https://moduchongmu-dev-bucket.s3.ap-northeast-2.amazonaws.com/travel/${travelId}/cover.png?${v ?? ''}`;
};

const getCityThumbnail = (cityName?: string) => {
  if (!cityName) return;
  return `https://moduchongmu-dev-bucket.s3.ap-northeast-2.amazonaws.com/city/${encodeURIComponent(cityName)}/cover`;
};

export { updateUserThumbnailQuery, updateTravelThumbnailQuery, getUserThumbnail, getTravelThumbnail, getCityThumbnail };
