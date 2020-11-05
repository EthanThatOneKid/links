<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from "svelte";

export let data: string[];
export let resetOnSelect: boolean;

const dispatch = createEventDispatcher();

let searchResults: string[] = [];
let isActive: boolean = false;
let inputRef: HTMLInputElement;
let searchResultRefs: HTMLDivElement[] = [];
let focusedIndex: number = -1;

const updateSearchResults = (searchQuery: string) => {
  if (searchQuery.length === 0) {
    searchResults = [];
    return;
  }
  const clean = (someText: string): string =>
    someText.toLowerCase().trim().replace(/\-|\s/g, "_");
  searchResults = data.filter((item) => {
    return clean(item).includes(clean(searchQuery));
  });
};

const updateFocusedIndex = (index: number = focusedIndex) => {
  if (index >= searchResults.length) {
    index = searchResults.length - 1;
  }
  if (index < 0) {
    focusedIndex = -1;
    inputRef.focus();
    return;
  }
  focusedIndex = index;
  if (searchResults[focusedIndex] !== undefined) {
    setTimeout(() => searchResultRefs[focusedIndex].focus());
  }
};

const handleSearchQueryChange = () => {
  setTimeout(() => updateSearchResults(inputRef.value));
};

const handleResultNavigation = (event: KeyboardEvent) => {
  if (searchResults.length > 0) {
    const hotKeys = ["ArrowUp", "ArrowDown", "Enter"];
    const hotKeyIndex = hotKeys.indexOf(event.key);
    if (hotKeyIndex > -1) {
      if (event.key === "ArrowUp") {
        focusedIndex--;
        updateFocusedIndex();
      } else if (event.key === "ArrowDown") {
        focusedIndex++;
        updateFocusedIndex();
      } else if (event.key === "Enter") {
        handleResultSelect(focusedIndex);
      }
    }
  }
};

const handleResultSelect = (index: number) => {
  dispatch("select", searchResults[index]);
  inputRef.focus();
  inputRef.value = resetOnSelect ? "" : searchResults[index];
  searchResults = [];
};

onMount(() => {
  document.addEventListener("keydown", handleResultNavigation);
});

onDestroy(() => {
  document.removeEventListener("keydown", handleResultNavigation);
});
</script>

<div class="search_component">
  <input
    on:focus="{() => (isActive = true)}"
    on:keydown="{handleSearchQueryChange}"
    bind:this="{inputRef}"
  />
  <div>
    {#if isActive}
      {#each searchResults as item, index}
        <div
          class="search_component-result"
          tabindex="{0}"
          on:click="{() => handleResultSelect(index)}"
          bind:this="{searchResultRefs[index]}"
        >
          {item}
        </div>
      {/each}
    {/if}
  </div>
</div>
