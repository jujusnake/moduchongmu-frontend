import { axiosPrivateInstance } from '@/APIs/axios';
import { queryKeys } from '@/APIs/react-query';
import { ErrorResponse } from '@/types/axios';
import { GetCurrentTravelRes, GetTravelErrorCodes } from '@/types/travel';
import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

const getCurrentTravel = async () => {
  const res = await axiosPrivateInstance.get('/travel/current');

  return res.data as GetCurrentTravelRes;
};

const useCurrentTravel = () => {
  const query = useQuery<GetCurrentTravelRes, AxiosError<ErrorResponse<GetTravelErrorCodes>>>({
    queryKey: [queryKeys.travel, 'current'],
    queryFn: getCurrentTravel,
    staleTime: 1000 * 60 * 60 * 2,
  });

  return query;
};

export { useCurrentTravel };
