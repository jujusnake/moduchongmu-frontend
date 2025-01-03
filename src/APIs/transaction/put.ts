import { PostTransactionRes, PutTransactionParams } from '@/types/transaction';
import { axiosPrivateInstance } from '../axios';
import { useMutation } from '@tanstack/react-query';

const updateTransaction = async (params: PutTransactionParams) => {
  const res = await axiosPrivateInstance.put('/transaction', params);

  return res.data as PostTransactionRes;
};

const useUpdateTransaction = () => {
  const mutation = useMutation({ mutationFn: updateTransaction });

  return mutation;
};

export { useUpdateTransaction };
