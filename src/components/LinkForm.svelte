<script lang="ts">
import { onMount, createEventDispatcher } from "svelte";
import Search from "./Search.svelte";

export let tagOptions: string[] = [];

const dispatch = createEventDispatcher();

let link: string = "";
let title: string = "";
let tags: Set<string> = new Set([]);
let tagValues: string[] = [];
let description: string = "";
let firstInputRef: HTMLInputElement;

const handleAddTag = (event: CustomEvent) => {
  const value: string = event.detail;
  tags.add(value);
  tagValues = [...tags];
};

const handleRemoveTag = (tagName: string) => {
  tags.delete(tagName);
  tagValues = [...tags];
};

const handleFocusTag = (tagName: string) => {};

const handleFormSubmit = () => {
  dispatch("submit", { link, title, description, tags: tagValues });
};

onMount(() => {
  firstInputRef.focus();
});
</script>

<div>
  <input bind:this="{firstInputRef}" bind:value="{link}" />
  <input bind:value="{title}" />
  <Search data="{tagOptions}" on:submit="{handleAddTag}" />
  <ul>
    {#each tagValues as tagValue}
      <li
        tabindex="{0}"
        on:click="{() => handleRemoveTag(tagValue)}"
        on:focus="{() => handleFocusTag(tagValue)}"
      >
        {tagValue}
      </li>
    {/each}
  </ul>
  <textarea bind:value="{description}"></textarea>
  <button on:click="{handleFormSubmit}">Submit</button>
  <pre>
    <code
    >
      {JSON.stringify({ link, title, description, tags: tagValues }, null, 2)}
    </code>
  </pre>
</div>
