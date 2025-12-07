import { dehydrate, QueryClient, HydrationBoundary } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes, type FetchNotesParams } from "@/lib/api"; 

const initialParams: FetchNotesParams = { page: 1, perPage: 10, search: "" };

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", initialParams],
    queryFn: () => fetchNotes(initialParams),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient /> 
    </HydrationBoundary>
  );
}