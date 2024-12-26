import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
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
