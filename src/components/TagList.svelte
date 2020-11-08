<!-- Reference:
- https://www.w3.org/TR/2017/WD-wai-aria-practices-1.1-20170628/examples/radio/radio-1/radio-1.html#kbd_label
-->
<script lang="ts">
import { createEventDispatcher } from "svelte";
import { keyboard } from "../actions/keyboard";

export let value: string[] = [];

const radiogroupHandlers = {};
</script>

<div role="radiogroup" tabindex="{0}" use:keyboard="{radiogroupHandlers}">
  {#each value as tag}
    <div role="radio" aria-checked="{false}">{tag}</div>
  {/each}
</div>

<!-- <ul tabindex="{0}">
  {#each value as tag}
    <li
      on:click="{() => handleRemoveTag(tag)}"
      on:focus="{() => handleFocusTag(tag)}"
    >
      {tag}
    </li>
  {/each}
</ul> -->
