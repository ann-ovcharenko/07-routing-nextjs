"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createNote, updateNote, fetchNoteById } from "../../lib/api";
import type { NoteCreationData, NoteTag, Note } from "../../types/note";
import { NoteSchema } from "./validationSchema";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onClose?: () => void;
  onSuccess?: () => void;
  onCancel?: () => void;
  noteId?: string;
}

const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const NoteForm: React.FC<NoteFormProps> = ({
  onClose,
  onSuccess,
  onCancel,
  noteId,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: existingNote, isLoading } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId!),
    enabled: !!noteId,
  });

  const handleClose = () => {
    if (onCancel) onCancel();
    else if (onClose) onClose();
    else router.back();
  };

  const mutation = useMutation({
    mutationFn: (values: NoteCreationData) =>
      noteId ? updateNote(noteId, values) : createNote(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      if (noteId) queryClient.invalidateQueries({ queryKey: ["note", noteId] });

      if (onSuccess) onSuccess();
      else handleClose();
    },
    onError: (error) => {
      alert(`Помилка: ${(error as Error).message}`);
    },
  });

  const handleSubmit = (values: NoteCreationData) => {
    mutation.mutate(values);
  };

  const initialValues: NoteCreationData = existingNote
    ? {
        title: existingNote.title,
        content: existingNote.content,
        tag: existingNote.tag,
      }
    : { title: "", content: "", tag: "Todo" };

  if (noteId && isLoading) return <p>Loading note data...</p>;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field id="tag" name="tag" as="select" className={css.select}>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? "Saving..."
              : noteId
              ? "Update note"
              : "Create note"}
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
