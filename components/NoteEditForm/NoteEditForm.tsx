"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNoteById, updateNote, NoteUpdateData } from "@/lib/api"; 
import type { NoteTag } from "@/types/note";
import { NoteSchema } from "../NoteForm/validationSchema"; 
import css from "./NoteEditForm.module.css"; 


interface NoteEditFormProps {
    noteId: string;
}

const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const NoteEditForm: React.FC<NoteEditFormProps> = ({ noteId }) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data: note, isLoading, isError, error } = useQuery({
        queryKey: ["note", noteId],
        queryFn: () => fetchNoteById(noteId),
        enabled: !!noteId, 
    });

    const updateNoteMutation = useMutation({
        mutationFn: (data: NoteUpdateData) => updateNote(noteId, data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            queryClient.invalidateQueries({ queryKey: ["note", noteId] });
            router.back(); 
        },

        onError: (error) => {
            console.error("Помилка при оновленні нотатки:", error);
            alert(`Помилка: ${(error as Error).message}. Спробуйте ще раз.`);
        },
    });

    if (isLoading) {
        return <div className={css.loadingContainer}>Loading note details...</div>;
    }

    if (isError) {
        return <div className={css.errorContainer}>Error loading note: {(error as Error).message}</div>;
    }
    
    const initialValues = {
        title: note?.title || '',
        content: note?.content || '',
        tag: note?.tag || tags[0],
    };

    const handleSubmit = (values: NoteUpdateData) => {
        const updatedData: NoteUpdateData = {};

        if (values.title !== note?.title) updatedData.title = values.title;
        if (values.content !== note?.content) updatedData.content = values.content;
        if (values.tag !== note?.tag) updatedData.tag = values.tag;
        
        if (Object.keys(updatedData).length > 0) {
            updateNoteMutation.mutate(updatedData);
        } else {
            router.back(); 
        }
    };

    const isSubmitting = updateNoteMutation.isPending;

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={NoteSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true} 
        >
            <Form className={css.form}>
                <h3>Edit Note ID: {noteId}</h3>
                
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
                    <button type="button" className={css.cancelButton} onClick={() => router.back()}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={css.submitButton}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </Form>
        </Formik>
    );
};

export default NoteEditForm;