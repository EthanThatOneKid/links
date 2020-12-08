<script lang="ts">
import { createEventDispatcher } from "svelte";
import type { CollectionEntry } from "../shared/fs";
import { tags } from "../stores/tags";
import TagListInput from "../components/TagListInput.svelte";

export let data: CollectionEntry;
export let isSelected: string = "false";
const dispatch = createEventDispatcher();

const submit = () => dispatch("change", { ...data });
</script>

<tr>
  <!-- selected -->
  <td><input type="radio" bind:value="{isSelected}" /></td>

  <!-- title -->
  <td>
    <input bind:value="{data.title}" /><br />
    <a href="{data.link}" target="_blank">&#x1F5D7;</a><br />
    <small>Last modified: {new Date(data.ts)}</small>
  </td>

  <!-- description -->
  <td><input bind:value="{data.description}" /></td>

  <!-- tags -->
  <td>
    <TagListInput
      initialTags="{data.tags}"
      options="{Object.keys($tags)}"
      on:change="{(event) => (data.tags = [...event.detail])}"
    />
  </td>

  <!-- link -->
  <td><input bind:value="{data.link}" /></td>
</tr>
