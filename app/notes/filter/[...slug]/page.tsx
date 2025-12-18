import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNotes, FetchNotesParams } from "@/lib/api";
import NotesClient from "./Notes.client"; 

interface NoteFilterPageProps {
  params: {
    slug: string[]; 
  };
}

const defaultParams: Omit<FetchNotesParams, "tag"> = {
  page: 1,
  perPage: 10,
  search: "",
};

export default async function NoteFilterPage({ params }: NoteFilterPageProps) {
  const filterSlug = params.slug?.[0] || "all";
  const tagToFetch = filterSlug !== "all" ? filterSlug : undefined;

  const apiParams: FetchNotesParams = {
    ...defaultParams,
    tag: tagToFetch,
  };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", apiParams],
    queryFn: () => fetchNotes(apiParams),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient slug={filterSlug} />
    </HydrationBoundary>
  );
}