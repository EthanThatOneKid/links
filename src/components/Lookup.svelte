<script lang="ts">
// import marked from "marked";
import TagListInput from "./TagListInput.svelte";
import {
  searchCollectionData,
  // exportCollectionDataAsMarkdown,
} from "../lib/utils";
import { links } from "../stores/links";
import { tags } from "../stores/tags";
import { isLoading } from "../stores/isLoading";
import type { CollectionEntry } from "../lib/fs";

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
    <!-- Todo: Automatically select first item in component list. -->
  {:else}First, load a collection (<code>.cltn</code>) file.{/if}
  <section>
    {#each searchResults as { title, description, link, ts, tags }}
      <div>
        <h2><a href="{link}">{title}</a></h2>
        <p>Last Updated: {new Date(ts)}</p>
        <p>{description}</p>
        <span
          >Tags:
          <ul>
            {#each tags as tag}
              <li>{tag}</li>
            {/each}
          </ul>
        </span>
      </div>
    {/each}
  </section>
  <pre><code>{JSON.stringify(searchResults, null, 2)}</code></pre>
  <!-- {@html marked(exportCollectionDataAsMarkdown($handle.name, {
      tags: $tags,
      links: $links,
    }))} -->
</div>

<style>
section {
  overflow-y: scroll;
  height: 75vh;
}
</style>
