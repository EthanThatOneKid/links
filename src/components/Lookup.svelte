<script lang="ts">
import TagListInput from "./TagListInput.svelte";
import { links } from "../stores/links";
import { tags } from "../stores/tags";

let searchFilters: string[] = [];

const handleTagChange = (event: CustomEvent) => {
  searchFilters = [...event.detail.tags];
};
</script>

<div>
  {#if $tags !== null}
    <TagListInput
      on:change="{handleTagChange}"
      options="{Object.keys($tags)}"
    />
  {:else}First, load a collection (<code>.cltn</code>) file.{/if}
</div>
