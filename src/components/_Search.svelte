<script lang="ts">
import { createEventDispatcher } from "svelte";
import { keyboard } from "../actions/keyboard";

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

const handleUpArrow = (stuff) => {
  console.log("UP_ARROW", { stuff });
  focusedIndex--;
  updateFocusedIndex();
};

const handleDownArrow = (stuff) => {
  console.log("DOWN_ARROW", { stuff });
  focusedIndex++;
  updateFocusedIndex();
};

const handleEnter = (stuff) => {
  console.log("Enter", { stuff });
  handleResultSelect(focusedIndex);
};

const handleResultSelect = (index: number) => {
  dispatch("select", searchResults[index]);
  inputRef.focus();
  inputRef.value = resetOnSelect ? "" : searchResults[index];
  searchResults = [];
};
</script>

<div
  class="search_component"
  use:keyboard="{{ Enter: handleEnter, ArrowUp: handleUpArrow, ArrowDown: handleDownArrow }}"
>
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
