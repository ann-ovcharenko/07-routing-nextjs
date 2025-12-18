"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, type FetchNotesParams } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import StatusError from "@/components/StatusError/StatusError";
import StatusLoader from "@/components/StatusLoader/StatusLoader";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./Notes.client.module.css";

interface NotesClientProps {
  slug: string;
}

const SEARCH_DEBOUNCE_DELAY = 300;

export default function NotesClient({ slug }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); 
    }, SEARCH_DEBOUNCE_DELAY);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const currentApiParams: FetchNotesParams = {
    page,
    perPage: 10,
    search: debouncedSearch,
    tag: slug !== "all" ? slug : undefined,
  };

  const { data, isPending, isError, error, isFetching } = useQuery({
    queryKey: ["notes", currentApiParams],
    queryFn: () => fetchNotes(currentApiParams),
    staleTime: 5000,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isError) return <StatusError message={error.message} />;

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;

  return (
    <div className={css.container}>
      <header className={css.header}>
        <h1>Notes filtered by: {slug}</h1>
        <button 
          className={css.createButton} 
          onClick={() => setIsModalOpen(true)}
        >
          Create Note
        </button>
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
          {isPending ? (
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
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm 
            onSuccess={() => setIsModalOpen(false)} 
            onCancel={() => setIsModalOpen(false)} 
          />
        </Modal>
      )}
    </div>
  );
}