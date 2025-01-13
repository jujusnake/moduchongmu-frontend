import { PutTravelParams, PutTravelRes } from '@/types/travel';
import { axiosPrivateInstance } from '../axios';
import { useMutation } from '@tanstack/react-query';
import { updateTravelThumbnailQuery } from '@/lib/urls';

const putTravel = async (params: PutTravelParams) => {
  const res = await axiosPrivateInstance.put('/travel', params);

  if (params.coverImage) updateTravelThumbnailQuery();

  return res.data as PutTravelRes;
};

const useUpdateTravel = () => {
  const mutation = useMutation({
    mutationFn: putTravel,
  });

  return mutation;
};

export { useUpdateTravel };
