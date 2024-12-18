import { PostTravelErrorCodes, PostTravelParams, PostTravelRes } from '@/types/travel';
import { axiosPrivateInstance } from '../axios';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse } from '@/types/axios';
import { useMutation } from '@tanstack/react-query';

const postTravel = async (params: PostTravelParams) => {
  const res = await axiosPrivateInstance.post('/travel', params);

  return res as AxiosResponse<PostTravelRes>;
};

const usePostTravel = () => {
  const mutation = useMutation<
    AxiosResponse<PostTravelRes>,
    AxiosError<ErrorResponse<PostTravelErrorCodes>>,
    PostTravelParams
  >({
    mutationFn: postTravel,
  });

  return mutation;
};

export { usePostTravel };
