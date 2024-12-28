import { axiosPrivateInstance } from '@/APIs/axios';
import { queryKeys } from '@/APIs/react-query';
import { ErrorResponse } from '@/types/axios';
import { GetTransactionListRes } from '@/types/transaction';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const PAGE_SIZE = 5;

const getTransactionList = async (params: { pageParam: number; travelUid: string }) => {
  const res = await axiosPrivateInstance.get('/transaction/list', {
    params: {
      page: params.pageParam,
      pageSize: PAGE_SIZE,
      travelUid: params.travelUid,
    },
  });

  return res.data as GetTransactionListRes;
};

const useTransactionList = (travelUid: string) => {
  const query = useInfiniteQuery<GetTransactionListRes, AxiosError<ErrorResponse>>({
    queryKey: [queryKeys.transaction, { type: 'list', uid: travelUid }],
    queryFn: (r) => getTransactionList({ pageParam: r.pageParam as number, travelUid }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const totalItemsCount = allPages.reduce((acc, page) => acc + page.transactionList?.length, 0);
      const lastPageNumber = Number.isInteger(lastPageParam) ? (lastPageParam as number) : 1;
      const hasNextPage = totalItemsCount < lastPage.totalCount;
      return hasNextPage ? lastPageNumber + 1 : undefined;
    },
  });

  return query;
};

export { useTransactionList };
