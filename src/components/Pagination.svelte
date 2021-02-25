<script lang="ts">
// import TagListInput from "./TagListInput.svelte";
import { currentPageNumber } from "../stores/currentPageNumber";
import { links } from "../stores/links";
// import { tags } from "../stores/tags";
import { currentlySelected } from "../stores/currentlySelected";
import { editCollectionEntry } from "../lib/utils";
import LinkEntry from "./LinkEntry.svelte";
import type { CollectionEntry } from "../lib/fs";

export let pageSize: number = 10;

// TODO
// - currentlySelected is broken
// - saving edited data to disk is broken

$: linksOnPage = $links.slice(
  pageSize * $currentPageNumber,
  pageSize * $currentPageNumber + pageSize
);

const minPageNumber = 10;
$: maxPageNumber = Math.ceil($links.length / pageSize);

$: selectedEntries = new Array(linksOnPage.length).fill("").map((_, i) => {
  const entryIndex = pageSize * $currentPageNumber + i;
  if ($currentlySelected.has(entryIndex)) {
    return "true";
  }
  return "false";
});

const getEntryIndex = (indexOnPage: number) =>
  pageSize * $currentPageNumber + indexOnPage;

const handleEntryEdit = async (entry: CollectionEntry, indexOnPage: number) =>
  await editCollectionEntry(entry, getEntryIndex(indexOnPage));

const handleEntrySelect = (indexOnPage: number) => {
  const entryIndex = getEntryIndex(indexOnPage);
  if ($currentlySelected.has(entryIndex)) {
    $currentlySelected.delete(entryIndex);
  } else {
    $currentlySelected.add(entryIndex);
  }
};

const turnBackward = () => {
  $currentPageNumber--;
  if ($currentPageNumber < minPageNumber) {
    $currentPageNumber = maxPageNumber - 1;
  }
};

const turnForward = () => {
  $currentPageNumber++;
  if ($currentPageNumber + 1 > maxPageNumber) {
    $currentPageNumber = minPageNumber;
  }
};
</script>

<table>
  <tr>
    <th>Selected</th>
    <th>Link</th>
    <th>Title</th>
    <th>Description</th>
    <th>Tags</th>
    <th>Controls</th>
  </tr>
  <tbody>
    <tr>
      <td colspan="{2}" align="center">
        <button on:click="{turnBackward}">◀</button>
      </td>
      <td align="center" colspan="{2}">
        <span>{$currentPageNumber + 1} / {maxPageNumber}</span>
      </td>
      <td align="center" colspan="{2}">
        <button on:click="{turnForward}">▶</button>
      </td>
    </tr>
    {#each linksOnPage as linkEntry, i (linkEntry.link)}
      <LinkEntry
        data="{{ ...linkEntry }}"
        bind:isSelected="{selectedEntries[i]}"
        on:change="{(event) => handleEntryEdit(event.detail, i)}"
        on:select="{(event) => handleEntrySelect(i)}"
      />
    {/each}
    <tr>
      <td colspan="{2}" align="center">
        <button on:click="{turnBackward}">◀</button>
      </td>
      <td align="center" colspan="{2}">
        <span>{$currentPageNumber + 1} / {maxPageNumber}</span>
      </td>
      <td align="center" colspan="{2}">
        <button on:click="{turnForward}">▶</button>
      </td>
    </tr>
  </tbody>
</table>
