import { axiosPrivateInstance } from '@/APIs/axios';
import { useMutation } from '@tanstack/react-query';

const postSettlement = async (travelUid: string) => {
  const res = await axiosPrivateInstance.post(`/travel/settlement`, {
    travelUid,
  });

  return res.data;
};

const useSettlement = () => {
  const mutate = useMutation({
    mutationFn: postSettlement,
  });

  return mutate;
};

export { useSettlement };
