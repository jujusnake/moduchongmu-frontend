import { axiosInstance } from '@/APIs/axios';
import { queryKeys } from '@/APIs/react-query';
import { GetTravelRes } from '@/types/travel';
import { useQuery } from '@tanstack/react-query';

const getTravelInviteInfo = async (travelUid?: string) => {
  if (!travelUid) return;
  const res = await axiosInstance.get(`/travel/invite`, {
    params: {
      travelUid,
    },
  });

  return res.data as GetTravelRes;
};

const useTravelInviteInfo = (travelUid?: string) => {
  const query = useQuery({
    queryKey: [queryKeys.travel, 'invite', travelUid],
    queryFn: () => getTravelInviteInfo(travelUid),
  });

  return query;
};

export { useTravelInviteInfo };
