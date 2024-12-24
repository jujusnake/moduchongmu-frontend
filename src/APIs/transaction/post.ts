import { useMutation } from '@tanstack/react-query';
import { axiosPrivateInstance } from '../axios';
import { PostTransactionParams, PostTransactionRes } from '@/types/transaction';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/types/axios';

const postTransaction = async (params: PostTransactionParams) => {
  const res = await axiosPrivateInstance.post('/transaction', params);

  return res.data as PostTransactionRes;
};

const useCreateTransaction = () => {
  const mutation = useMutation<PostTransactionRes, AxiosError<ErrorResponse>, PostTransactionParams>({
    mutationFn: postTransaction,
  });

  return mutation;
};

export { useCreateTransaction };
