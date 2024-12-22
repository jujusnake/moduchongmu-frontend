import { axiosPrivateInstance } from '@/APIs/axios';
import { queryKeys } from '@/APIs/react-query';
import { ErrorResponse } from '@/types/axios';
import { GetTravelListRes } from '@/types/travel';
import { QueryFunctionContext, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const PAGE_SIZE = 5;

// For Infinite Scroll
const getTravelList = async ({ pageParam = 1 }: QueryFunctionContext) => {
  const res = await axiosPrivateInstance.get('/travel/list', {
    params: {
      page: pageParam,
      pageSize: PAGE_SIZE,
    },
  });

  return res.data as GetTravelListRes;
};

const useTravelList = () => {
  const query = useInfiniteQuery<GetTravelListRes, AxiosError<ErrorResponse>>({
    queryKey: [queryKeys.travel, 'list'],
    queryFn: getTravelList,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const totalItemsCount = allPages.reduce((acc, page) => acc + page.travelList.length, 0);
      const lastPageNumber = Number.isInteger(lastPageParam) ? (lastPageParam as number) : 1;
      const hasNextPage = totalItemsCount < lastPage.totalCount;

      return hasNextPage ? lastPageNumber + 1 : undefined;
    },
  });

  return query;
};

export { useTravelList };
