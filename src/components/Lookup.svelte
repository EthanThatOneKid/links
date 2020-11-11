<script lang="ts">
import TagListInput from "./TagListInput.svelte";
import { loadCollectionData } from "../shared/fs";
import type { CollectionData, CollectionEntry } from "../shared/fs";

export let tagOptions: string[] = [];

let tagValues: string[] = [];
let collectionData: CollectionData;

const loadCollectionFile = async () => {
  collectionData = await loadCollectionData();
};

const handleTagChange = (event: CustomEvent) => {
  tagValues = [...event.detail.tags];
};
</script>

<div>
  <button on:click="{loadCollectionFile}">Load Collection File</button>
  <TagListInput on:change="{handleTagChange}" options="{tagOptions}" />
</div>
