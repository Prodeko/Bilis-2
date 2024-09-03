import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default MyApp;
