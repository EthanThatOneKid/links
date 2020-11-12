<script lang="ts">
import { onMount, createEventDispatcher } from "svelte";
import TagListInput from "./TagListInput.svelte";
import { tags } from "../stores/tags";

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

  <label for="tags">Tags:</label>
  <TagListInput on:change="{handleTagChange}" options="{Object.keys($tags)}" />

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

<style lang="scss">
div {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}
</style>
