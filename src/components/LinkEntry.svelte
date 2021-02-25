<script lang="ts">
import { createEventDispatcher } from "svelte";
import type { CollectionEntry } from "../lib/fs";
import { tags } from "../stores/tags";
import TagListInput from "../components/TagListInput.svelte";
import MetaDetails from "./MetaDetails.svelte";

export let data: CollectionEntry;
export let isSelected: string = "false";
const dispatch = createEventDispatcher();

const submit = () => dispatch("change", { ...data });
const deleteEntry = () => dispatch("delete");
</script>

<tr>
  <!-- selected -->
  <td><input type="checkbox" bind:value="{isSelected}" /></td>

  <!-- link -->
  <td>
    <table>
      <tr>
        <td>
          <MetaDetails url="{data.link}" />
        </td>
        <td>
          <label for="link">Link:</label>
          <input name="link" bind:value="{data.link}" />
          <a href="{data.link}" target="_blank">&#x1F5D7;</a><br />
          <small>Last modified: {new Date(data.ts)}</small>
        </td>
      </tr>
    </table>
  </td>

  <!-- title -->
  <td>
    <label for="title">Title:</label>
    <input name="title" bind:value="{data.title}" />
  </td>

  <!-- description -->
  <td>
    <label for="description">Description:</label>
    <textarea name="description" bind:value="{data.description}"></textarea>
  </td>

  <!-- tags -->
  <td>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label>Tags:</label>
    <TagListInput
      initialTags="{data.tags}"
      options="{Object.keys($tags)}"
      on:change="{(event) => (data.tags = [...event.detail])}"
    />
  </td>

  <!-- controls -->
  <td>
    <button on:click="{submit}">Submit Changes</button>
    <button on:click="{deleteEntry}">Delete</button>
  </td>
</tr>

<style>
tr {
  border: 1px solid black;
}
</style>
