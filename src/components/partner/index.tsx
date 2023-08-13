import ASSETS from "@/src/constant/assets";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

const Img = styled.img`
  object-fit: contain;
`;

function Partner() {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      `}
    >
      <h1
        css={css`
          font-weight: 900;
        `}
      >
        Our Partner
      </h1>
      <div
        css={css`
          background-color: #f5f5f5;
          width: 100%;
          padding: 1rem 2rem;
          gap: 2rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        `}
      >
        <Img src={ASSETS.GOTO_LOGO} width={120} height={120} />
        <Img src={ASSETS.GOJEK_LOGO} width={120} height={120} />
        <Img src={ASSETS.TOKOPEDIA_LOGO} width={120} height={120} />
      </div>
    </div>
  );
}

export default Partner;
