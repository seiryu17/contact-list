import { css } from "@emotion/react";
import React from "react";
import SearchInput from "../search-input";
import { Button, Grid, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { IContact } from "@/src/constant/form-contant";
import { ColumnsType } from "antd/lib/table";

const { useBreakpoint } = Grid;

interface IProps {
  searchVal: string;
  setSearchVal: (val: string) => void;
  loading: boolean;
  loadingCount: boolean;
  count: number;
  sortedContacts: IContact[];
  handlePageChange: (page: number) => void;
  handleDelete: (id: string) => Promise<void>;
  PAGE_LIMIT: number;
  columns: ColumnsType<IContact>;
}

function TableContentRegular(props: IProps) {
  const {
    searchVal,
    setSearchVal,
    loading,
    loadingCount,
    count,
    sortedContacts,
    handlePageChange,
    PAGE_LIMIT,
    columns,
  } = props;
  const router = useRouter();
  const mq = useBreakpoint();
  return (
    <>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          align-items: center;
          background-color: white;
          padding: 1rem;
          border-radius: 8px 8px 0 0;
          margin-top: 4rem;
          box-shadow: 6px 8px 16px -7px rgba(110, 110, 110, 1);
        `}
      >
        <h1
          css={css`
            margin-bottom: 0;
          `}
        >
          Contact List
        </h1>
        <div
          css={css`
            display: flex;
            gap: 8px;
          `}
        >
          <SearchInput searchVal={searchVal} setSearchVal={setSearchVal} />
          <Button
            icon={
              <PlusOutlined
                css={css`
                  stroke-width: 3;
                  stroke: white;
                `}
              />
            }
            onClick={() => router.push("/form-contact")}
            shape="round"
            type="primary"
          >
            Add {mq.xs ? "" : "Contact"}
          </Button>
        </div>
      </div>
      <Table
        css={css`
          box-shadow: 6px 8px 16px -7px rgba(110, 110, 110, 1);
        `}
        scroll={{ x: 300 }}
        loading={loading || loadingCount}
        columns={columns}
        dataSource={sortedContacts}
        rowKey="id"
        footer={
          mq.xs
            ? () => (
                <span
                  css={css`
                    color: #91e3a9;
                    font-weight: 900;
                  `}
                >
                  This table is scrollable / swipeable
                </span>
              )
            : undefined
        }
        pagination={{
          style: {
            padding: "1.5rem 1rem",
            borderRadius: "0 0 8px 8px",
            margin: 0,
            backgroundColor: "#FFFFFF",
          },
          total: count,
          defaultPageSize: PAGE_LIMIT,
          onChange: handlePageChange,
        }}
      />
    </>
  );
}

export default React.memo(TableContentRegular);
