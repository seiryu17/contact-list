import { css } from "@emotion/react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      css={css`
        height: 100%;
      `}
      lang="en"
    >
      <Head />
      <body
        css={css`
          height: 100%;
          margin: 0;
        `}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
