import ASSETS from "@/src/constant/assets";
import { css } from "@emotion/react";
import React from "react";
import Header from "../header";
import { Grid } from "antd";
import Link from "next/link";

interface IProps {
  children: React.ReactNode;
}

const { useBreakpoint } = Grid;

function Layout({ children }: IProps) {
  const mq = useBreakpoint();
  return (
    <div>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: ${!mq.lg ? "1rem" : "1.5rem 2rem"};
          width: 100%;
          position: absolute;
          top: 0;
          background-color: transparent;
        `}
      >
        <img
          src={ASSETS.GOTO_LOGO}
          css={css`
            cursor: pointer;
          `}
          width={`${!mq.lg ? 80 : 100}`}
          alt="logo"
        />
        <nav
          css={css`
            display: flex;
            gap: ${!mq.lg ? "30px" : "48px"};
          `}
        >
          {[
            { label: "Home", path: "/" },
            { label: "Form Contact", path: "/form-contact" },
          ].map((item, i) => (
            <Link
              key={i}
              css={css`
                font-size: ${!mq.lg ? "14px" : "20px"};
              `}
              href={item.path}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {children}
    </div>
  );
}

export default Layout;
