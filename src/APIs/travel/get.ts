import { GetTravelErrorCodes, GetTravelRes } from '@/types/travel';
import { axiosPrivateInstance } from '../axios';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../react-query';
import { ErrorResponse } from '@/types/axios';

const getTravel = async (uid: string) => {
  if (uid.length < 1) return;
  const res = await axiosPrivateInstance.get(`/travel`, {
    params: {
      uid,
    },
  });

  return res as AxiosResponse<GetTravelRes>;
};

const useTravel = (uid: string) => {
  const query = useQuery<AxiosResponse<GetTravelRes> | undefined, AxiosError<ErrorResponse<GetTravelErrorCodes>>>({
    queryKey: [queryKeys.travel, uid],
    queryFn: () => getTravel(uid),
    enabled: uid.length > 0,
  });

  return query;
};

export { useTravel };
