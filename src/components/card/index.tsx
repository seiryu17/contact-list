import { HeartFilled } from "@ant-design/icons";
import { css } from "@emotion/react";
import React from "react";

interface IProps {
  title: string;
  content: string;
  icon?: React.ReactNode;
}

function Card(props: IProps) {
  const { title, content, icon } = props;
  return (
    <div
      css={css`
        background-color: #ffffff;
        border-radius: 8px;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        box-shadow: 6px 8px 16px -7px rgba(110, 110, 110, 1);
        position: relative;
      `}
    >
      <span
        css={css`
          font-weight: 600;
          font-size: 16px;
          color: #a9aebb;
        `}
      >
        {title}
      </span>
      <span
        css={css`
          font-size: 48px;
        `}
      >
        {content}
        {icon}
      </span>
    </div>
  );
}

export default Card;
