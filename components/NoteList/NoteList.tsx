import React from "react";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note"; 
import { deleteNote } from "../../lib/api";
import css from "./NoteList.module.css";

interface NoteListProps {
 notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
 const queryClient = useQueryClient();

 const deleteNoteMutation = useMutation({
 mutationFn: deleteNote,

 onSuccess: () => {
 queryClient.invalidateQueries({ queryKey: ["notes"] });
 },
 onError: (error) => {
 console.error("Помилка при видаленні нотатки:", error);
 alert("Не вдалося видалити нотатку. Перевірте консоль.");
 },
 });

 const handleDelete = (id: string) => {
 deleteNoteMutation.mutate(id);
 };

 return (
 <ul className={css.list}>
 {notes.map((note) => (
 <li key={note.id} className={css.listItem}>
 <h2 className={css.title}>{note.title}</h2>
 <p className={css.content}>{note.content}</p>
 <div className={css.footer}>
 <span className={css.tag}>{note.tag}</span>
 <Link href={`/notes/edit/${note.id}`} className={css.editLink}>
 Edit
 </Link>

 <Link href={`/notes/${note.id}`} className={css.detailsLink}>
 View details
 </Link>

 <button
 className={css.button}
 onClick={() => handleDelete(note.id)} 
 disabled={deleteNoteMutation.isPending}
 >
 {deleteNoteMutation.isPending ? "Deleting..." : "Delete"}
 </button>
 </div>
 </li>
 ))}
 </ul>
 );
};

export default NoteList;