import ASSETS from "@/src/constant/assets";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Grid } from "antd";
import { useRouter } from "next/router";
import React from "react";

const Img = styled.img`
  object-fit: contain;
`;

const { useBreakpoint } = Grid;

function Footer() {
  const mq = useBreakpoint();
  const router = useRouter();
  return (
    <div
      css={css`
        background-color: #f5f5f5;
        padding: 1.5rem 2rem;
        text-align: ${mq.md ? "flex-start" : "center"};
        padding: ${mq.lg ? "1.5rem 8rem" : "1.5rem 2rem"};
      `}
    >
      <img
        css={css`
          cursor: pointer;
        `}
        onClick={() => router.push("/")}
        src={ASSETS.GOTO_LOGO}
        width={100}
      />
      <div
        css={css`
          margin-top: 1rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: ${mq.md ? "space-between" : "center"};
        `}
      >
        <p
          css={css`
            width: 400px;
            text-align: justify;
            color: #a9aebb;
          `}
        >
          My name is Rio Riferro Lim, I am a Frontend Developer, and really
          excited to join GoTo. So this is my GoTo Assignment. I hope you like
          it.
        </p>

        <div>
          <h3>Social Media</h3>
          <div
            css={css`
              display: flex;
              justify-content: center;
              gap: 8px;
            `}
          >
            <a
              target="_blank"
              href="https://www.linkedin.com/in/rioriferro/"
              rel="noopener noreferrer"
            >
              <Img src={ASSETS.LINKEDIN_LOGO} width={40} />
            </a>
            <a
              target="_blank"
              href="https://github.com/seiryu17"
              rel="noopener noreferrer"
            >
              <Img src={ASSETS.GITHUB_LOGO} width={40} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
