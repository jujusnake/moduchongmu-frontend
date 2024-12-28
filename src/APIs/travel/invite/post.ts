import { axiosPrivateInstance } from '@/APIs/axios';
import { useMutation } from '@tanstack/react-query';

const postTravelInvite = async (travelUid: string) => {
  const res = await axiosPrivateInstance.post('/travel/invite', {
    travelUid,
  });

  return res.data;
};

const useTravelInvite = () => {
  const mutate = useMutation({
    mutationFn: postTravelInvite,
  });

  return mutate;
};

export { useTravelInvite };
