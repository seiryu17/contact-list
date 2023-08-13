import type { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "antd/dist/antd.variable.min.css";
import "../src/styles/globals.css";
import { Poppins } from "next/font/google";
import { ConfigProvider } from "antd";
import { css } from "@emotion/react";

const roboto = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const client = new ApolloClient({
  uri: "https://wpe-hiring.tokopedia.net/graphql",
  cache: new InMemoryCache(),
});

ConfigProvider.config({
  theme: {
    primaryColor: "#3DD957",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      css={css`
        height: 100%;
      `}
      className={roboto.className}
    >
      <ApolloProvider client={client}>
        <ConfigProvider>
          <Component {...pageProps} />
        </ConfigProvider>
      </ApolloProvider>
    </main>
  );
}
