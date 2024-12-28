import { axiosPrivateInstance } from '@/APIs/axios';
import { SettlementRes } from '@/types/travel';
import { useMutation } from '@tanstack/react-query';

const postSettlement = async (travelUid: string) => {
  const res = await axiosPrivateInstance.post(`/travel/settlement`, {
    travelUid,
  });

  return res.data as SettlementRes;
};

const useSettlement = () => {
  const mutate = useMutation({
    mutationFn: postSettlement,
  });

  return mutate;
};

export { useSettlement };
