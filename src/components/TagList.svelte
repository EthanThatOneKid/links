<!-- Reference:
- https://www.w3.org/TR/2017/WD-wai-aria-practices-1.1-20170628/examples/radio/radio-1/radio-1.html#kbd_label
-->
<script lang="ts">
import Search from "./Search.svelte";
import { keyboard } from "../actions/keyboard";

export let data: string[] = [];
export let value: string[] = [];

let currentIndex: number = -1;
let optionRefs: HTMLDivElement[] = [];
let tags: Set<string> = new Set([]);

const radiogroupHandlers = {
  ArrowUp() {
    moveUp();
  },
  ArrowDown() {
    moveDown();
  },
  ArrowLeft() {
    moveUp();
  },
  ArrowRight() {
    moveDown();
  },
  Delete() {
    removeTag(currentIndex);
  },
  Space() {
    removeTag(currentIndex);
  },
  Enter() {
    removeTag(currentIndex);
  },
};

const removeTag = (tagIndex: number) => {
  value = value.slice(0, tagIndex).concat(value.slice(tagIndex + 1));
  if (currentIndex === tagIndex && currentIndex > 0) {
    currentIndex--;
  }
};

const focusTag = (tag: string | number) => {
  if (currentIndex === -1 && value.length > 0) {
    currentIndex = 0;
  }
  if (currentIndex > -1) {
    const tagIndex = typeof tag === "string" ? value.indexOf(tag) : tag;
    if (tagIndex > -1) {
      optionRefs[currentIndex].setAttribute("aria-checked", "false");
      optionRefs[tagIndex].setAttribute("aria-checked", "true");
    }
    currentIndex = tagIndex;
  }
};

const moveDown = () => {
  focusTag(
    currentIndex === value.length - 1 || currentIndex === -1
      ? 0
      : currentIndex + 1
  );
};

const moveUp = () => {
  focusTag(
    currentIndex === 0 || currentIndex === -1
      ? value.length - 1
      : currentIndex - 1
  );
};

const handleFocus = () => {
  if (value.length > 0) {
    currentIndex = 0;
  }
};

const handleBlur = () => {
  currentIndex = -1;
};

const handleSearchSubmit = (event: CustomEvent) => {
  tags.add(event.detail);
  value = Array.from(tags);
};
</script>

<div>
  <label for="searchbar">Add Tag(s):</label>
  <Search data="{data}" on:submit="{handleSearchSubmit}" />
  <div
    role="radiogroup"
    tabindex="{0}"
    use:keyboard="{radiogroupHandlers}"
    on:focus="{handleFocus}"
    on:blur="{handleBlur}"
  >
    {#each value as tag, index}
      <div
        role="radio"
        aria-checked="{false}"
        bind:this="{optionRefs[index]}"
        class="tag-item"
        class:active="{currentIndex === index}"
      >
        {tag}
      </div>
    {/each}
  </div>
</div>

<style>
.active {
  border: 1px solid orchid;
}
</style>
