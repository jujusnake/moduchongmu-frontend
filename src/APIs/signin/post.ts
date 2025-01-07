import { PostSigninNativeTokenParams, PostSigninParams, PostSigninRes, SocialSigninType } from '@/types/signin';
import { axiosInstance } from '../axios';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse } from '@/types/axios';

const postSignin = async ({ type, code }: PostSigninParams) => {
  const res = await axiosInstance.post(`/signin/${type}`, {
    code,
  });

  return res as AxiosResponse<PostSigninRes>;
};

const postSigninNativeToken = async ({ type, token }: PostSigninNativeTokenParams) => {
  const res = await axiosInstance.post(`/signin/${type}`, {
    token,
  });

  return res as AxiosResponse<PostSigninRes>;
};

const usePostSignin = () => {
  const mutation = useMutation<AxiosResponse<PostSigninRes>, AxiosError<ErrorResponse>, PostSigninParams>({
    mutationFn: postSignin,
  });

  return mutation;
};

const usePostSigninNativeToken = () => {
  const mutation = useMutation<AxiosResponse<PostSigninRes>, AxiosError<ErrorResponse>, PostSigninNativeTokenParams>({
    mutationFn: postSigninNativeToken,
  });

  return mutation;
};

export { usePostSignin, usePostSigninNativeToken };
