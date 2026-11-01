import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { RecoilRoot } from 'recoil';

import { LocaleProvider } from '@/i18n/provider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // A 404 or 400 will not get better by asking again, so those fail
      // straight away; network and server errors get two more tries.
      retry: (failureCount, error) => {
        const status = axios.isAxiosError(error)
          ? error.response?.status
          : undefined;

        if (status && status < 500) return false;

        return failureCount < 2;
      },
    },
  },
});

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        <RecoilRoot>{children}</RecoilRoot>
      </LocaleProvider>
    </QueryClientProvider>
  );
}

export default Provider;
