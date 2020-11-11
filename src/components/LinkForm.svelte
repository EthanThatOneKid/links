<script lang="ts">
import { onMount, createEventDispatcher } from "svelte";
import TagListInput from "./TagListInput.svelte";

export let tagOptions: string[] = [];

const dispatch = createEventDispatcher();

let link: string = "";
let title: string = "";
let tagValues: string[] = [];
let description: string = "";
let firstInputRef: HTMLInputElement;

const handleFormSubmit = () => {
  dispatch("submit", { link, title, description, tags: tagValues });
  link = "";
  title = "";
  tagValues = [];
  description = "";
  firstInputRef.focus();
};

const handleTagChange = (event: CustomEvent) => {
  tagValues = [...event.detail.tags];
};

onMount(() => {
  firstInputRef.focus();
});
</script>

<div>
  <label for="link">Link:</label>
  <input name="link" bind:this="{firstInputRef}" bind:value="{link}" />

  <label for="title">Title:</label>
  <input name="title" bind:value="{title}" />

  <TagListInput on:change="{handleTagChange}" options="{tagOptions}" />

  <label for="description">Description:</label>
  <textarea name="description" bind:value="{description}"></textarea>

  <button on:click="{handleFormSubmit}">Submit</button>
  <pre>
    <code
    >
      {JSON.stringify({ link, title, description, tags: tagValues }, null, 2)}
    </code>
  </pre>
</div>
