/** @jsxImportSource @emotion/react */

import useContactLists from "@/src/hooks/useContactLists";
import { css } from "@emotion/react";
import { IContact } from "@/src/constant/form-contant";
import { Button, Grid, message } from "antd";
import Table from "antd/lib/table";
import { PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import useContactCount from "@/src/hooks/useContactCount";
import { useMutation } from "@apollo/client";
import DELETE_CONTACT from "@/src/apollo-client/mutations/delete-contact";
import { useEffect, useMemo, useState } from "react";
import useDebounce from "@/src/hooks/useDebounce";
import { GetLocalStorage, SetLocalStorage } from "@/src/utility/local-storage";
import CREATE_CONTACT from "@/src/apollo-client/mutations/create-contact";
import Layout from "@/src/components/layout";
import Partner from "@/src/components/partner";
import CardList from "@/src/components/card/card-list";
import { getColumnConfig } from "@/src/components/table-column";
import SearchInput from "@/src/components/search-input";
import Hero from "@/src/components/hero";

const PAGE_LIMIT = 10;

const { useBreakpoint } = Grid;

export default function Home() {
  const [searchVal, setSearchVal] = useState("");
  const [query, setQuery] = useState("");
  const [favContactList, setFavContactList] = useState<IContact[]>([]);

  const { data, error, loading, fetchMore, refetchContacts } =
    useContactLists(query);
  const {
    data: dataCount,
    error: errorCount,
    loading: loadingCount,
    refetchContactsCount,
  } = useContactCount();

  const [deleteContact] = useMutation(DELETE_CONTACT, {
    onCompleted: () => {
      refetchContacts();
    },
  });
  const [createContact] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      refetchContacts();
    },
  });
  const count = dataCount?.contact_aggregate.aggregate?.count;
  const sortedContacts = data?.contact
    ? [...data.contact].sort((a: IContact, b: IContact) =>
        a.first_name.localeCompare(b.first_name)
      )
    : [];
  const router = useRouter();
  const mq = useBreakpoint();

  useEffect(() => {
    const initialData = GetLocalStorage("favContactList") || [];
    setFavContactList(initialData);
  }, []);

  useDebounce(
    () => {
      setQuery(searchVal);
    },
    [searchVal],
    500
  );

  const handleFavoriteToggle = async (record: IContact) => {
    const isFavorite = favContactList.some(
      (contact) => contact.id === record.id
    );

    if (isFavorite) {
      const updatedFavorites = favContactList.filter(
        (contact) => contact.id !== record.id
      );
      const item = favContactList.find((contact) => contact.id === record.id);
      const createVar = {
        first_name: item?.first_name,
        last_name: item?.last_name,
        phones: item?.phones.map((phone) => ({ number: phone.number })),
      };

      try {
        const response = await createContact({
          variables: createVar,
        });
        if (response.data) {
          message.success("Contact added to regular successfully.");
          SetLocalStorage("favContactList", updatedFavorites);
          setFavContactList(updatedFavorites);
          refetchContactsCount();
        }
      } catch (error) {
        message.success("Failed to add regular.");
      }
    } else {
      const updatedFavorites = [
        ...favContactList,
        { ...record, is_favorite: true },
      ];
      SetLocalStorage("favContactList", updatedFavorites);
      setFavContactList(updatedFavorites);
      handleDelete(record.id, true).then(() => refetchContactsCount());
    }
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    const offset = (page - 1) * (pageSize || PAGE_LIMIT);

    fetchMore({
      variables: {
        offset,
        limit: pageSize || PAGE_LIMIT,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return fetchMoreResult;
      },
    });
  };

  const handleDelete = async (id: string, isFavorite?: boolean) => {
    try {
      const response = await deleteContact({ variables: { id } });
      if (response.data) {
        message.success(
          `Contact ${
            isFavorite ? "added to favorite" : "deleted"
          } successfully.`
        );
      }
    } catch (error) {
      message.error(
        `Failed to ${isFavorite ? "add favorite" : "delete"} a contact.`
      );
    }
  };

  const columns = getColumnConfig({
    handleDelete,
    handleFavoriteToggle,
    refetchContactsCount,
    router,
  });

  const TableWrapperFavorite = () => (
    <div
      css={css`
        background-color: #ffffff;
        padding: 1rem 0;
        border-radius: 8px;
        margin-top: 4rem;
        box-shadow: 6px 8px 16px -7px rgba(110, 110, 110, 1);
      `}
    >
      <h1
        css={css`
          margin: 0.5rem 1rem;
        `}
      >
        Favorite Contact List
      </h1>
      <Table
        scroll={{ x: 300 }}
        columns={columns.filter((item) => item.key !== "action")}
        dataSource={favContactList}
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
        }}
      />
    </div>
  );

  const TableWrapperRegular = useMemo(
    () => (
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
    ),
    [loading, loadingCount, data, count, columns, searchVal]
  );

  if (error || errorCount) return <div>something went wrong</div>;
  return (
    <Layout>
      <Hero />
      <Partner />
      <h1
        css={css`
          font-weight: 900;
          text-align: center;
          margin-top: 2rem;
        `}
      >
        Our System
      </h1>
      <div
        css={css`
          padding: ${mq.md ? "1rem 3rem;" : "1rem"};
        `}
      >
        <CardList count={count || "-"} favContactList={favContactList.length} />
        <TableWrapperFavorite />
        {TableWrapperRegular}
      </div>
    </Layout>
  );
}
