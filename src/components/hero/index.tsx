import ASSETS from "../../../src/constant/assets";
import { css } from "@emotion/react";
import { Grid } from "antd";
import Layout from "antd/lib/layout/layout";
import React from "react";

const { useBreakpoint } = Grid;

function Hero() {
  const mq = useBreakpoint();

  return (
    <div
      css={css`
        margin: 4rem 0 2rem 0;
        padding: 1.5rem 2rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        text-align: center;
        gap: 48px;
        border-bottom: 2px solid #e8e8e8;
        @media (min-width: 1024px) {
          flex-direction: row;
          text-align: left;
          margin: 7rem 0 2rem 0;
          padding: 0 0 2rem 4rem;
        }
      `}
    >
      <div
        css={css`
          flex: 1;
          align-self: center;
          flex-direction: column;
          display: flex;
          gap: ${!mq.lg ? "16px" : "8px"};
        `}
      >
        <span
          css={css`
            font-size: ${!mq.lg ? "14px" : "20px"};
            font-weight: 400;
          `}
        >
          Welcome to Rio&apos;s GoTo Assignment
        </span>
        <span
          css={css`
            font-size: ${!mq.lg ? "24px" : !mq.xl ? "32px" : "48px"};
            font-weight: 800;
            line-height: 1.4;
          `}
        >
          Connect and Cherish: Your{" "}
          <span
            css={css`
              color: #ff7f7f;
            `}
          >
            Beloved Contacts
          </span>
          , All in One Place
        </span>
        <span
          css={css`
            font-size: ${!mq.lg ? "14px" : "20px"};
            font-weight: 400;
            text-align: justify;
            color: #aca3b8;
          `}
        >
          Discover a new way to preserve your cherished connections. Introducing
          Rio&apos;s Contact List, where every relationship finds its home.
          Seamlessly save, organize, and celebrate the special people in your
          life.
        </span>
      </div>
      <div
        css={css`
          flex: 1;
          text-align: center;
        `}
      >
        <img
          alt="World"
          src={ASSETS.WORLD_CONNECT_ART}
          width={`${!mq.lg ? "60%" : "80%"}`}
        />
      </div>
    </div>
  );
}

export default Hero;
