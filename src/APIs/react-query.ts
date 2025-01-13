import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 10,
    },
    mutations: {
      retry: 1,
    },
  },
});

const queryKeys = {
  user: 'user',
  travel: 'travel',
  transaction: 'transaction',
};

export { queryClient, queryKeys };
