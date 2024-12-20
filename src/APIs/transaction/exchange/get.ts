import { axiosPrivateInstance } from '@/APIs/axios';
import { GetExchangeRateRes } from '@/types/transaction';
import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse } from 'react-router-dom';

const getExchangeRate = async (currency: string) => {
  const res = await axiosPrivateInstance.get(`/transaction/exchangeRate`, {
    params: {
      currency,
    },
  });

  https: return res as AxiosResponse<GetExchangeRateRes>;
};

const useExchange = (currency: string) => {
  const query = useQuery<AxiosResponse<GetExchangeRateRes>, AxiosError<ErrorResponse>>({
    queryKey: ['exchange', currency],
    queryFn: () => getExchangeRate(currency),
  });

  return query;
};

export { useExchange };
