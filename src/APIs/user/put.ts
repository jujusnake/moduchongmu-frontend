import { axiosInstance, axiosPrivateInstance } from '../axios';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse } from '@/types/axios';
import { PutUserParams, PutUserRes } from '@/types/user';
import { updateUserThumbnailQuery } from '@/lib/urls';

const putUser = async (params: PutUserParams) => {
  const res = await axiosPrivateInstance.put(`/user`, params);

  if (params.profileImage) updateUserThumbnailQuery();

  return res as AxiosResponse<PutUserRes>;
};

const usePutUser = () => {
  const mutation = useMutation<AxiosResponse<PutUserRes>, AxiosError<ErrorResponse>, PutUserParams>({
    mutationFn: putUser,
  });

  return mutation;
};

export { usePutUser };
