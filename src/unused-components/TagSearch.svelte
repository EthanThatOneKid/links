<!-- Reference:
- https://www.youtube.com/watch?v=uCIC2LNt0bk&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=6
- https://www.w3.org/TR/wai-aria-practices-1.1/examples/combobox/aria1.1pattern/listbox-combo.html#kbd_label
-->
<script lang="ts">
import { createEventDispatcher } from "svelte";
import { keyboard } from "../actions/keyboard";

export let value: string = "";
export let data: string[] = [];

const dispatch = createEventDispatcher();

// let inputRef: HTMLInputElement;
let optionRefs: HTMLLIElement[] = [];
let isExpanded: boolean = false;
let selectedIndex: number = -1;
let filteredData: string[] = [];

$: isExpanded = filteredData.length > 0;

const updateFilteredData = (query: string) => {
  if (query.length === 0) {
    filteredData = [];
    return;
  }
  const clean = (someText: string): string =>
    someText.toLowerCase().trim().replace(/\-|\s/g, "_");
  filteredData = data.filter((item) => {
    return clean(item).includes(clean(query));
  });
};

const focusOption = (index: number) => {
  if (selectedIndex > -1) {
    optionRefs[selectedIndex].setAttribute("aria-selected", "false");
  }
  optionRefs[index].setAttribute("aria-selected", "true");
  selectedIndex = index;
};

const closeOptions = () => {
  selectedIndex = -1;
  filteredData = [];
};

const textboxHandlers = {
  ArrowDown() {
    if (isExpanded) {
      focusOption(
        selectedIndex === filteredData.length - 1 || selectedIndex === -1
          ? 0
          : selectedIndex + 1
      );
    }
  },
  ArrowUp() {
    if (isExpanded) {
      focusOption(
        selectedIndex === 0 || selectedIndex === -1
          ? filteredData.length - 1
          : selectedIndex - 1
      );
    }
  },
  Escape() {
    if (isExpanded) {
      closeOptions();
      value = "";
    }
  },
  Enter() {
    if (selectedIndex >= 0) {
      handleOptionSelect(selectedIndex);
    } else {
      dispatch("submit", value);
      closeOptions();
      value = "";
    }
  },
};

const handleQueryChange = (event: KeyboardEvent) => {
  setTimeout(() => {
    const { value: query } = event.target as HTMLInputElement;
    updateFilteredData(query);
  });
};

const handleOptionSelect = (index: number) => {
  dispatch("submit", filteredData[index]);
  closeOptions();
  value = "";
};
</script>

<div class="combobox-wrapper">
  <div
    role="combobox"
    aria-expanded="{isExpanded}"
    aria-owns="search_listbox"
    aria-haspopup="listbox"
  >
    <input
      type="text"
      aria-autocomplete="list"
      aria-controls="search_listbox"
      use:keyboard="{textboxHandlers}"
      on:keydown="{handleQueryChange}"
      bind:value
      name="searchbar"
    />
    <!-- on:blur="{closeOptions}"
    /> -->
  </div>
  <ul id="search_listbox" role="listbox" class="listbox hidden">
    {#each filteredData as option, index}
      <li
        role="option"
        aria-selected="{selectedIndex === index}"
        bind:this="{optionRefs[index]}"
        on:click="{() => handleOptionSelect(index)}"
      >
        {option}
      </li>
    {/each}
  </ul>
</div>

<style>
li[aria-selected="true"] {
  border: 1px solid orchid;
}
</style>
