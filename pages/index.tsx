/** @jsxImportSource @emotion/react */

import useContactLists from "@/src/hooks/useContactLists";
import { css } from "@emotion/react";
import { IContact } from "@/src/constant/form-contant";
import { Grid, message } from "antd";
import { useRouter } from "next/router";
import useContactCount from "@/src/hooks/useContactCount";
import { useMutation } from "@apollo/client";
import DELETE_CONTACT from "@/src/apollo-client/mutations/delete-contact";
import { useEffect, useState } from "react";
import useDebounce from "@/src/hooks/useDebounce";
import { GetLocalStorage, SetLocalStorage } from "@/src/utility/local-storage";
import CREATE_CONTACT from "@/src/apollo-client/mutations/create-contact";
import Layout from "@/src/components/layout";
import Partner from "@/src/components/partner";
import CardList from "@/src/components/card/card-list";
import { getColumnConfig } from "@/src/components/table-column";
import Hero from "@/src/components/hero";
import TableContentRegular from "@/src/components/table-content-regular";
import TableContentFavorite from "@/src/components/table-content-favorite";

const PAGE_LIMIT = 10;

const { useBreakpoint } = Grid;

export default function Home() {
  const [searchVal, setSearchVal] = useState("");
  const [query, setQuery] = useState("");
  const [favContactList, setFavContactList] = useState<IContact[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
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

  const startIndex = (currentPage - 1) * PAGE_LIMIT;
  const endIndex = startIndex + PAGE_LIMIT;
  const displayedContacts = favContactList.slice(startIndex, endIndex);

  const handleFavoritePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
        <TableContentFavorite
          PAGE_LIMIT={PAGE_LIMIT}
          favContactList={favContactList}
          columns={columns}
          currentPage={currentPage}
          handleFavoritePageChange={handleFavoritePageChange}
          displayedContacts={displayedContacts}
        />
        <TableContentRegular
          loading={loading}
          loadingCount={loadingCount}
          sortedContacts={sortedContacts}
          columns={columns}
          searchVal={searchVal}
          setSearchVal={setSearchVal}
          handlePageChange={handlePageChange}
          count={count}
          handleDelete={handleDelete}
          PAGE_LIMIT={PAGE_LIMIT}
        />
      </div>
    </Layout>
  );
}
