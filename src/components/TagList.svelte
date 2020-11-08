<!-- Reference:
- https://www.w3.org/TR/2017/WD-wai-aria-practices-1.1-20170628/examples/radio/radio-1/radio-1.html#kbd_label
-->
<script lang="ts">
import { createEventDispatcher } from "svelte";
import { keyboard } from "../actions/keyboard";

export let value: string[] = [];

let tags: Set<string> = new Set(value);
let currentIndex: number = -1;
let optionRefs: HTMLDivElement[];

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
    removeTag(value[currentIndex]);
  },
  Space() {
    removeTag(value[currentIndex]);
  },
  Enter() {
    removeTag(value[currentIndex]);
  },
};

const removeTag = (tag: string) => {
  tags.delete(tag);
  value = Array.from(tags);
};

const focusTag = (tag: string | number) => {
  console.log({ tag });
  if (currentIndex > -1) {
    const tagIndex = typeof tag === "string" ? value.indexOf(tag) : tag;
    if (tagIndex > -1) {
      console.log({ optionRefs });
      optionRefs[currentIndex].setAttribute("aria-checked", "false");
      optionRefs[tagIndex].setAttribute("aria-checked", "true");
    }
    currentIndex = tagIndex;
  }
};

// const focusHandler = () => {
//   console.log("FOCUS");
//   if (value.length > 0) {
//     if (currentIndex === -1) {
//       currentIndex = 0;
//     }
//     focusTag(0);
//   }
// };

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
</script>

<div role="radiogroup" tabindex="{0}" use:keyboard="{radiogroupHandlers}">
  {#each value as tag, index}
    <div role="radio" aria-checked="{false}" bind:this="{optionRefs[index]}">
      {tag}
    </div>
  {/each}
</div>

<style>
div[aria-checked="true"] {
  border: 1px solid orchid;
}
</style>
