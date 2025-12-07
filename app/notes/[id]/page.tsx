import { dehydrate, QueryClient, HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import NoteDetailsClient from "./NoteDetails.client";

interface NoteDetailsPageProps {
  params: Promise<{
    id: string; 
  }>;
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  
  const resolvedParams = await params;
  
  const { id } = resolvedParams;
  
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}