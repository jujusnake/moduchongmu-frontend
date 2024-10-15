import { PostSigninParams, PostSigninRes, SocialSigninType } from '@/types/signin';
import { axiosInstance } from '../axios';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse } from '@/types/axios';

const postSignin = async ({ type, code }: PostSigninParams) => {
  const res = await axiosInstance.post(`/signin/${type}`, {
    code,
  });

  return res as AxiosResponse<PostSigninRes>;
};

const usePostSignin = () => {
  const mutation = useMutation<AxiosResponse<PostSigninRes>, AxiosError<ErrorResponse>, PostSigninParams>({
    mutationFn: postSignin,
  });

  return mutation;
};

export { usePostSignin };
