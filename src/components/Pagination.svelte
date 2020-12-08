<script lang="ts">
import TagListInput from "./TagListInput.svelte";
import { currentPageNumber } from "../stores/currentPageNumber";
import { links } from "../stores/links";
import { tags } from "../stores/tags";
import { checkArraysAreIdentical, editCollectionEntry } from "../shared/utils";
import LinkEntry from "./LinkEntry.svelte";
import type { CollectionEntry } from "../shared/fs";

export let pageSize: number = 10;

$: linksOnPage = $links.slice(
  pageSize * $currentPageNumber,
  pageSize * $currentPageNumber + pageSize
);

const minPageNumber = 0;
$: maxPageNumber = Math.ceil($links.length / pageSize);

const handleEntryEdit = async (entry: CollectionEntry, indexOnPage: number) => {
  const entryIndex = pageSize * $currentPageNumber + indexOnPage;
  return await editCollectionEntry(entry, entryIndex);
};

const turnBackward = () => {
  $currentPageNumber--;
  if ($currentPageNumber < minPageNumber) {
    $currentPageNumber = maxPageNumber;
  }
};

const turnForward = () => {
  $currentPageNumber++;
  if ($currentPageNumber > maxPageNumber) {
    $currentPageNumber = minPageNumber;
  }
};
</script>

<table>
  <tr>
    <th>Selected</th>
    <th>Title</th>
    <th>Description</th>
    <th>Tags</th>
    <th>Link</th>
  </tr>
  <tbody>
    <tr>
      <td colspan="{2}"><button on:click="{turnBackward}">◀</button></td>
      <td><span>{$currentPageNumber + 1} / {maxPageNumber}</span></td>
      <td colspan="{2}"><button on:click="{turnForward}">▶</button></td>
    </tr>
    {#each linksOnPage as linkEntry, i}
      <LinkEntry
        data="{linkEntry}"
        on:change="{(event) => handleEntryEdit(event.detail, i)}"
      />
    {/each}
  </tbody>
</table>
