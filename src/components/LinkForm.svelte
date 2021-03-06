<script lang="ts">
import { onMount, createEventDispatcher } from "svelte";
import TagListInput from "./TagListInput.svelte";
import { saveCollectionData } from "../lib/fs";
import { tags } from "../stores/tags";
import { links } from "../stores/links";
import { isLoading } from "../stores/isLoading";
import { handle } from "../stores/handle";

const dispatch = createEventDispatcher();

let link: string = "";
let title: string = "";
let tagValues: string[] = [];
let description: string = "";
let firstInputRef: HTMLInputElement;

const handleFormSubmit = async () => {
  const doesLinkExist = $links.some((entry) => {
    try {
      return new URL(link).toString() === new URL(entry.link).toString();
    } catch {
      return link === entry.link;
    }
  });
  if (!doesLinkExist) {
    // TODO:
    // - If link exists, just edit original one.
    // - Abstract adding a new link to a util function.
    // - Reset tag input on successful submission.
    $isLoading = true;
    const firstNullIndex = $links.indexOf(null);
    const linkIndex = firstNullIndex > -1 ? firstNullIndex : $links.length - 1;
    $links[linkIndex] = {
      link,
      title,
      description,
      tags: tagValues,
      ts: Date.now(),
    };
    $tags = tagValues.reduce((map, tag) => {
      if (map[tag] === undefined) {
        map[tag] = [linkIndex];
      } else {
        map[tag].push(linkIndex);
      }
      return map;
    }, $tags);
    const contents = JSON.stringify({ tags: $tags, links: $links });
    await saveCollectionData($handle, contents);
    $isLoading = false;
  } else {
    console.log("LINK_ALREADY_EXISTS");
  }
  link = "";
  title = "";
  tagValues = [];
  description = "";
  firstInputRef.focus();
};

const handleTagChange = (event: CustomEvent) => {
  tagValues = [...event.detail];
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
  <div class="taglistinput-container">
    <TagListInput
      on:change="{handleTagChange}"
      options="{Object.keys($tags)}"
    />
  </div>

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

  .taglistinput-container {
    display: block;
    width: min-content;
    height: min-content;
  }
}
</style>
