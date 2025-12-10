import type { Note, NoteCreationData } from "../types/note";
import axios, { type AxiosResponse } from "axios";

interface ApiNotesResponse {
 notes: Note[];
 totalPages: number;
 totalCount: number;
}

export interface FetchNotesParams {
 page: number;
 perPage: number;
 search: string;
 tag?: string;
}

export type NoteUpdateData = {
  title?: string;
  content?: string;
  tag?: string;
};


export type FetchNotesResponse = ApiNotesResponse;

const BASE_URL = "https://notehub-public.goit.study/api";

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (typeof TOKEN !== "string" || !TOKEN) {
 throw new Error(
   "Не знайдено токен авторизації NEXT_PUBLIC_NOTEHUB_TOKEN. Перевірте файл .env.local."
 );
}

const noteApi = axios.create({
 baseURL: BASE_URL,
 headers: {
 Authorization: `Bearer ${TOKEN}`,
 "Content-Type": "application/json",
 },
});

export const fetchNotes = async ({
 page,
 perPage,
 search,
 tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
 const response: AxiosResponse<ApiNotesResponse> = await noteApi.get(
 "/notes",
 {
 params: {
 page,
 perPage,
 ...(search && { search }),
 ...(tag && { tag }),
 },
 }
 );

 return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
 const response: AxiosResponse<Note> = await noteApi.get(`/notes/${id}`);
 return response.data;
};

export const createNote = async (data: NoteCreationData): Promise<Note> => {
 const response: AxiosResponse<Note> = await noteApi.post("/notes", data);
 return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
 const response: AxiosResponse<Note> = await noteApi.delete(`/notes/${id}`);
 return response.data;
};

export const updateNote = async (id: string, data: NoteUpdateData): Promise<Note> => {
 const response: AxiosResponse<Note> = await noteApi.patch(`/notes/${id}`, data); 
 return response.data;
};