import { css } from "@emotion/react";
import { Input } from "antd";
import React from "react";

interface IProps {
  searchVal: string;
  setSearchVal: (val: string) => void;
}

function SearchInput({ searchVal, setSearchVal }: IProps) {
  return (
    <Input
      value={searchVal}
      css={css`
        border-radius: 16px;
      `}
      onChange={(e) => setSearchVal(e.target.value)}
      placeholder="Search Name..."
    />
  );
}

export default SearchInput;
