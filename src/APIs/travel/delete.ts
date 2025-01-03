import { AxiosResponse } from 'axios';
import { axiosPrivateInstance } from '../axios';
import { useMutation } from '@tanstack/react-query';

const deleteTravel = async (uid: string) => {
  const res = await axiosPrivateInstance.delete('/travel', {
    params: {
      uid,
    },
  });

  return res as AxiosResponse<{ uid: string }>;
};

const useDeleteTravel = () => {
  const mutation = useMutation({ mutationFn: deleteTravel });

  return mutation;
};

export { useDeleteTravel };
