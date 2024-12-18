const getUserThumbnail = (userEmail?: string) => {
  if (!userEmail) return;
  return `https://moduchongmu-dev-bucket.s3.ap-northeast-2.amazonaws.com/user/${userEmail}/profile.png`;
};

const getTravelThumbnail = (travelId?: string) => {
  if (!travelId) return;
  return `https://moduchongmu-dev-bucket.s3.ap-northeast-2.amazonaws.com/travel/${travelId}/cover.png`;
};

export { getUserThumbnail, getTravelThumbnail };
