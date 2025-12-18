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
import css from "./Notes.client.module.css";

interface NotesClientProps {
  initialParams: FetchNotesParams & {
    slug?: string;
    data: {
      notes: Note[];
      totalPages: number;
    };
  };
}

const SEARCH_DEBOUNCE_DELAY = 300;

export default function NotesClient({ initialParams }: NotesClientProps) {
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

  const currentApiParams: FetchNotesParams = {
    page: params.page,
    perPage: params.perPage,
    search: params.search,
    tag: params.slug && params.slug !== "all" ? params.slug : undefined,
  };

  const { data, isPending, isError, error, isFetching } = useQuery({
    queryKey: ["notes", currentApiParams],
    queryFn: () => fetchNotes(currentApiParams),
    initialData: initialParams.data,
    staleTime: 5000,
  });

  const handlePageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  if (isError) {
    return (
      <div className={css.container}>
        <StatusError message={error.message} />
      </div>
    );
  }

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;

  return (
    <div className={css.container}>
      <header className={css.header}>
        <h1>Notes filtered by: {params.slug || "All"}</h1>
      </header>

      <div className={css.searchWrapper}>
        <SearchBox
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          isSearching={isFetching}
        />
      </div>

      <div className={css.contentWrapper}>
        <div className={css.notesList}>
          {isPending && !data ? (
            <StatusLoader message="Завантаження..." />
          ) : notes.length === 0 ? (
            <p className={css.emptyMessage}>Нотаток не знайдено.</p>
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
