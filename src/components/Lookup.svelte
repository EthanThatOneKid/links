<script lang="ts">
// import marked from "marked";
import TagListInput from "./TagListInput.svelte";
import {
  searchCollectionData,
  // exportCollectionDataAsMarkdown,
} from "../shared/utils";
import { links } from "../stores/links";
import { tags } from "../stores/tags";
import { handle } from "../stores/handle";
import { isLoading } from "../stores/isLoading";
import type { CollectionEntry } from "../shared/fs";

let searchFilters: string[] = [];
let searchResults: CollectionEntry[] = [];

const handleTagChange = async (event: CustomEvent) => {
  console.time("SEARCH_COLLECTION");
  $isLoading = true;
  searchFilters = [...event.detail];
  searchResults = await searchCollectionData(
    { tags: $tags, links: $links },
    {
      filters: searchFilters,
      isSortedByRecency: true,
      isSearchingByTagsOnly: false,
      isSortedAlphabetically: false,
    }
  );
  $isLoading = false;
  console.timeEnd("SEARCH_COLLECTION");
};
</script>

<div>
  {#if $tags !== null}
    <TagListInput
      willMakeFocus="{true}"
      on:change="{handleTagChange}"
      options="{Object.keys($tags)}"
    />
  {:else}First, load a collection (<code>.cltn</code>) file.{/if}
  <pre><code>{JSON.stringify(searchResults, null, 2)}</code></pre>
  <!-- {@html marked(exportCollectionDataAsMarkdown($handle.name, {
      tags: $tags,
      links: $links,
    }))} -->
</div>
