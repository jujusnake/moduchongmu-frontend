import { axiosPrivateInstance } from '@/APIs/axios';
import { useMutation } from '@tanstack/react-query';

const deleteTravelMember = async (params: { memberName: string; travelUid: string }) => {
  const res = axiosPrivateInstance.delete('/travel/member', {
    params,
  });

  return res;
};

const useDeleteTravelMember = () => {
  const mutation = useMutation({
    mutationFn: deleteTravelMember,
  });

  return mutation;
};

export { useDeleteTravelMember };
