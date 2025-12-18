"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, type FetchNotesParams } from "@/lib/api";
import { Note } from "@/types/note";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import StatusError from "@/components/StatusError/StatusError";
import StatusLoader from "@/components/StatusLoader/StatusLoader";
import css from "./FilteredNotesClient.module.css";

interface FilteredNotesClientProps {
  initialParams: FetchNotesParams & {
    tag?: string;
    data: {
      notes: Note[];
      totalPages: number;
    };
  };
}

const SEARCH_DEBOUNCE_DELAY = 300;

export default function FilteredNotesClient({
  initialParams,
}: FilteredNotesClientProps) {
  const [params, setParams] = useState(initialParams);
  const [searchTerm, setSearchTerm] = useState(initialParams.search);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setParams((prev) => ({
        ...prev,
        page: 1,
        search: searchTerm,
      }));
    }, SEARCH_DEBOUNCE_DELAY);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const getTagForApi = (tag: string | undefined): string | undefined => {
    return tag && tag !== "all" ? tag : undefined;
  };

  const currentApiParams: FetchNotesParams = {
    page: params.page,
    perPage: params.perPage,
    search: params.search,
    tag: getTagForApi(params.tag),
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["notes", currentApiParams],
    queryFn: () => fetchNotes(currentApiParams),
    initialData: () => {
      const isSamePage = initialParams.page === currentApiParams.page;
      const isSameSearch = initialParams.search === currentApiParams.search;
      const isSameTag = initialParams.tag === currentApiParams.tag;

      return isSamePage && isSameSearch && isSameTag
        ? initialParams.data
        : undefined;
    },
    staleTime: 5000,
  });

  const handlePageChange = (newPage: number) => {
    setParams((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  if (isPending && !data) {
    return (
      <div className={css.container}>
        <StatusLoader message="Завантаження нотаток..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={css.container}>
        <StatusError message={`Помилка завантаження: ${error.message}`} />
      </div>
    );
  }

  const { notes, totalPages } = data;

  return (
    <div className={css.container}>
      <header className={css.header}>
        <h1>Notes filtered by: {params.tag || "All"}</h1>
      </header>

      <div className={css.searchWrapper}>
        <SearchBox
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          isSearching={isPending}
        />
      </div>

      <div className={css.contentWrapper}>
        <div className={css.notesList}>
          {notes.length === 0 && params.search ? (
            <p className={css.emptyMessage}>
              Нотаток за запитом &quot;{params.search}&quot; не знайдено.
            </p>
          ) : notes.length === 0 ? (
            <p className={css.emptyMessage}>
              Нотаток у цій категорії поки немає.
            </p>
          ) : (
            <NoteList notes={notes} />
          )}
        </div>

        {totalPages > 1 && (
          <div className={css.paginationWrapper}>
            <Pagination
              currentPage={params.page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
